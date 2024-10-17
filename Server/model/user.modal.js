const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // URL or path to the profile picture
    default: 'default-profile-pic.jpg', // Default picture if none is provided
  },
  numberOfSubscribers : {
    type : Number,
    default : 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
