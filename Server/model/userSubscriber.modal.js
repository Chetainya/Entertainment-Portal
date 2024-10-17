const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriber: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who subscribes
  subscribedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who is being subscribed to
  subscribedAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
