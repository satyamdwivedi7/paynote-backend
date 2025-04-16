const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email or phone already exists" });
    }
    const user = await User.create({ username, email, phone, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from the request body
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await User.findById(userId).select("-password"); // Use userId from the request body
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  login,
  getUserInfo,
};
