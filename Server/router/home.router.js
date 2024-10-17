const express = require('express');
const router = express.Router();
const Subscription = require('../model/userSubscriber.modal.js');
const Video = require('../model/video.modal.js'); 


// Get latest videos from subscribed channels
router.get('/', async (req, res) => {
  try {
    const subscriberId = req.user.id; // Logged-in user's ID

    // Step 1: Find the users the subscriber is subscribed to
    const subscriptions = await Subscription.find({ subscriber: subscriberId }).select('subscribedTo');
    
    if (subscriptions.length === 0) {
      return res.status(200).json({ message: 'No subscriptions found', videos: [] });
    }

    const subscribedToIds = subscriptions.map(sub => sub.subscribedTo);

    // Step 2: Fetch the latest video from each subscribed channel
    const latestVideos = await Video.aggregate([
      { $match: { userId: { $in: subscribedToIds } } }, // Match videos from subscribed users
      { $sort: { uploadedAt: -1 } }, // Sort by upload date (descending)
      { $group: { 
          _id: '$userId', // Group by user/channel
          latestVideo: { $first: '$$ROOT' } // Get the first (latest) video for each user
        } 
      },
      { $replaceRoot: { newRoot: '$latestVideo' } } ,
      {// Replace the root with the video document itself
      $lookup: { 
        from: 'users', // Collection to join
        localField: 'userId', // Field in the Video collection
        foreignField: '_id', // Field in the User collection
        as: 'user' // Alias for the joined data
      } 
    },
    { $unwind: '$user' } ,
    ])

    res.status(200).json({ videos: latestVideos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
