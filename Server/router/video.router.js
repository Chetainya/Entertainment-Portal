const express = require("express");
const User = require('../model/user.modal.js'); 
const Video = require("../model/video.modal.js"); // Adjust the path as necessary

const router = express.Router();

// Create a new video
router.post("/video", async (req, res) => {
  if (!req.user) {
    return res.json({ msg: "User not Logged in" });
  }

  try {
    const { title, description, url, thumbnail, series } = req.body;

    console.log(req.body);
    // Validate required fields
    if (!title || !url) {
      return res
        .status(400)
        .json({ error: "Title, URL, and UserId are required" });
    }

    // Create a new video instance
    const newVideo = new Video({
      title,
      description,
      url,
      thumbnail,
      // Optional, only if it's part of a series
      userId: req.user.id,
    });

    // Save the video to the database
    const savedVideo = await newVideo.save();

    // Respond with the saved video
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/videos", async (req, res) => {
  try {
    // Extract userId from the request (assuming authentication middleware)
    const userId = req.user.id;
    // Assuming the user ID is stored in req.user from authentication

    if (!userId) {
      return res.status(400).json({ msg: "User not Logged in" });
    }
    // Find videos by userId
    const userVideos = await Video.find({ userId }).populate('userId');
    console.log("populate" , userVideos);
    // Respond with the videos
    res.status(200).json(userVideos);
  } catch (error) {
    console.error("Error fetching user videos:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.post("/addToSeries", async (req, res) => {
  const { videoId } = req.body;

  const { seriesId } = req.query;

  console.log("series" , seriesId)
  try {
    const videoToAdd = await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { series: seriesId },
      },
      {
        new: true,
      }
    );
    res.status(200).json(videoToAdd);

  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });

  }
});

module.exports = router;
