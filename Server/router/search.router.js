const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// MongoDB Models
const Video = require('../model/video.modal');
const User = require('../model/user.modal');
const Series = require('../model/series.modal');


// Search Route
router.get('/', async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;
  console.log("Query" , query)

  if (!query) {
      return res.status(400).json({ error: 'Query is required' });
  }

  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);

  // Calculate the number of documents to skip
  const skip = (pageNumber - 1) * limitNumber;

  try {
      // Search for videos, users, and series
      const videoResults = await Video.find({ title: { $regex: query, $options: 'i' } })
          .skip(skip)
          .limit(limitNumber).populate('userId')

          console.log(videoResults)

      const userResults = await User.find({ fullName: { $regex: query, $options: 'i' } })
          .skip(skip)
          .limit(limitNumber);

      const seriesResults = await Series.find({ seriesName: { $regex: query, $options: 'i' } })
          .skip(skip)
          .limit(limitNumber).populate('userId')

      // Optional: Count the total number of results to help calculate total pages
      const videoCount = await Video.countDocuments({ title: { $regex: query, $options: 'i' } });
      const userCount = await User.countDocuments({ fullName: { $regex: query, $options: 'i' } });
      const seriesCount = await Series.countDocuments({ title: { $regex: query, $options: 'i' } });

      // Total pages calculation (optional)
      const totalPages = Math.ceil(Math.max(videoCount, userCount, seriesCount) / limitNumber);
      res.json({
          
          items : [...videoResults , ...userResults , ...seriesResults],
          page: pageNumber,
          totalPages,
      });
  } catch (error) {
      console.error('Search Error:', error.message);
      res.status(500).json({ error: 'Server Error' });
  }
});




module.exports = router;
