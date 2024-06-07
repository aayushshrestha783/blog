const User = require("../models/User");
const Blog = require("../models/Blog");
const fs = require("fs");
const throwError = require("../middlewares/throwError");

//get all users
const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
//get users by id
const getUserById = async (req, res) => {
  try {
    const user_id = req.params.userID;
    let user = await User.findById(user_id).select("name bio occupation");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//deleteBlog by Id
const deleteUserById = async (req, res) => {
  try {
    const user_id = req.params.userID;

    // Find and delete the user by their ID
    const deletedUser = await User.findByIdAndDelete(user_id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find and delete all blog posts associated with the user
    await Blog.deleteMany({ user: user_id });

    res.status(200).json({
      success: true,
      message: "User and associated posts deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getUser,
  getUserById,
  deleteUserById,
};
