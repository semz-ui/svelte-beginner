const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/auth.model");
const generateTokenAndSetCookie = require("../helpers/generateTokenAndSetCookie");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Please input all fields" });
    const user = await User.findOne({ $or: [{ email }] });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    if (newUser) {
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateTokenAndSetCookie(newUser._id),
        success: true,
      });
    } else {
      return res
        .status(400)
        .json({ error: "Invalid user data", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const isPasswordCorrest = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrest) {
      return res
        .status(400)
        .json({ error: "Invalid password please try again", success: false });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
      peerId: user.peerId,
      token: generateTokenAndSetCookie(user._id),
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
