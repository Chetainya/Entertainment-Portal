const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user.modal.js");
const { generateToken } = require("../services/auth.js");

router.post("/register", async (req, res) => {
  const { fullName, email, password, profilePicture } = req.body;
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Create a new user instance
    if (profilePicture !== "null" || profilePicture !== null) {
      user = new User({
        fullName,
        email,
        password,
        profilePicture,
      });
    } else {
      user = new User({
        fullName,
        email,
        password,
      });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();
    const token = generateToken(user);
    return res.cookie("token", token).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User does not exists" }] });
    }

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const token = generateToken(user);
    res.cookie("token", token).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/details", async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  try {
    let user = await User.findOne({ _id: userId });
    console.log("user", user);
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User does not exists" }] });
    }
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//logout handeled on the client side

module.exports = router;
