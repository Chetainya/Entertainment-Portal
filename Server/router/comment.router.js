const express = require("express");
const router = express.Router();
const Comment = require("../model/comment.modal"); // Assuming the Comment schema is in the models directory

// Add a new comment to a video
router.post("/addComment", async (req, res) => {
  const { videoId, userId, content } = req.body;

  if (!videoId || !userId || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create a new comment
    const newComment = new Comment({
      videoId,
      userId,
      content,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Add a reply to a specific comment
router.post("/addReply/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  console.log(userId , content)

  if (!userId || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the comment by its ID
    const comment = await Comment.findById(commentId)
      

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Add a new reply to the replies array
    comment.replies.push({
      content,
      userId,
      createdAt: new Date(),
    });

    // Save the updated comment with the new reply
    const updatedComment = await comment.save();


    res.status(201).json(updatedComment.replies);
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get all comments for a specific video (synchronously handled)
router.get("/:videoId", async (req, res) => {
  const { videoId } = req.params;
  

  // Find comments by videoId
  try {
    const comments = await Comment.find({ videoId })
      .populate("userId") // Populate user information
      .populate("replies.userId"); // Populate user info for replies

    if (!comments.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
