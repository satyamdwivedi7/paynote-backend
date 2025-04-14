const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const user = await User.create({ username, email, phone });
    res.status(201).json(username);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const username = await User.findById(req.params.id);
    if (!username) return res.status(404).json({ error: "User not found" });
    res.json(username);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
};
