const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String, // URL or path to the thumbnail image
    default : "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
  },
  series: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Series',  // Reference to Series schema
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  // Reference to User schema
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
