const express = require('express');
const Series = require('../model/series.modal'); // Adjust the path as needed
const router = express.Router();

// POST /api/series - Create a new series
router.post('/create', async (req, res) => {
    if(!req.user){
        return res.json({
            msg : "User not Logged In"
        })
    }
  try {
    const { title, description, thumbnail, userId } = req.body;

    // Validate required fields
    if (!title || !userId) {
      return res.status(400).json({ error: 'Title, and UserId are required' });
    }

    // Create a new series instance
    const newSeries = new Series({
      seriesName : title,
      description,
      thumbnail,
      userId,
    });

    // Save the series to the database
    const savedSeries = await newSeries.save();

    // Respond with the saved series
    res.status(201).json(savedSeries);
  } catch (error) {
    console.error('Error creating series:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

router.get('/get', async (req, res) => {
  try {
    // Extract userId from the request (assuming authentication middleware)
    const userId = req.user.id;
     // Assuming the user ID is stored in req.user from authentication

     if(!userId){
      return res.json({msg : "User not Logged in"});
     }
    // Find videos by userId
    const userSeries = await Series.find({ userId }).populate('userId');

    // Respond with the videos
    res.status(200).json(userSeries);
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});



module.exports = router;
