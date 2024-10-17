const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true, // The comment text
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Reference to the User who made the comment
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', // Reference to the Video the comment belongs to
    required: true,
  },
  replies: [
    {
      content: { type: String, required: true }, // Reply content
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // User who replied
      createdAt: { type: Date, default: Date.now }, // Time of reply
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp of the comment creation
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
