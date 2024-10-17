const express = require('express');
const router = express.Router();
const Subscription = require('../model/userSubscriber.modal');
const User = require('../model/user.modal');

// Subscribe to a user
router.post('/subscribe', async (req, res) => {

    if(!req.user){
        return res.status(400).json({msg : "User not Logged in"});
       }

  try {
    
    const { userId , subscribedToId } = req.body; // Get the subscribedToId from the request body

    console.log(userId , subscribedToId);
    

    

    // Create a new subscription
    const newSubscription = new Subscription({
      subscriber: userId,
      subscribedTo: subscribedToId,
    });

    await newSubscription.save();
    const creatorUser = await User.findOne({_id : subscribedToId});
    creatorUser.numberOfSubscribers++;
    await creatorUser.save();

    res.status(201).json({
      message: 'Subscribed successfully',
      subscription: newSubscription,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/isSubscribed' , async (req , res) => {
  const {creatorId} = req.body
  console.log('user' , req.user.id , creatorId)
  try{
    const subscriberData = await Subscription.find( {
     
        subscriber: req.user.id,
        subscribedTo: creatorId,
      
    } );
    if(subscriberData.length === 0){
      
      return res.status(201).json({msg : "Not Subscribed"});
    }
    res.status(201).json(subscriberData);
  }catch(error){
    res.status(500).json({ error: 'Server error' });
  }
})


router.post('/details' , async (req , res) => {
  const {userId} = req.body
  console.log(userId)
  try{
    const userSubscribers = await Subscription.find( {subscribedTo : userId} );
    res.status(201).json(userSubscribers);
  }catch(error){
    res.status(500).json({ error: 'Server error' });
  }
})

router.post('/unsubscribe', async (req, res) => {
  const { subscriber, subscribedTo } = req.body; // userId is the subscriber, creatorId is the user being unsubscribed from

  try {
    // Find and delete the subscription
    const subscription = await Subscription.findOneAndDelete({ 
      subscriber, 
      subscribedTo 
    });
    console.log("unsubscribe" ,subscription)

    
    // Find the creator and decrement the number of subscribers
    const creatorUser = await User.findById(subscribedTo);
    
    if (creatorUser && creatorUser.numberOfSubscribers > 0) {
      creatorUser.numberOfSubscribers--;
      await creatorUser.save(); // Save updated subscriber count
    }

    return res.json({ msg: 'Successfully unsubscribed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});



module.exports = router;
