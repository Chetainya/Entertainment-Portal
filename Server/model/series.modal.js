const mongoose = require('mongoose');
const { Schema } = mongoose;

const seriesSchema = new Schema({
  seriesName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  thumbnail: {
    type: String, // URL or path to the thumbnail image
    default : "default Image"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  // Reference to User schema
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Series = mongoose.model('Series', seriesSchema);
module.exports = Series;
