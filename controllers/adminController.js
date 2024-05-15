const User = require("../models/User");
const Blog = require("../models/Blog");
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
    let user = await User.findById(user_id);
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

//get all blog
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
//get blog by id
const getBlogById = async (req, res) => {
  try {
    const blog_id = req.params.blogID;
    let blog = await Blog.findById(blog_id);
    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
//get blog by user_id
const getBlogByUserId = async (req, res) => {
  try {
    const user_id = req.params.userID;
    let blog = await Blog.find({ user: user_id });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, error: "No blog posted by user" });
    }
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//deleteBlog by Id
const deleteBlog = async (req, res) => {
  try {
    const blog_id = req.params.blogID;
    const deletedBlog = await Blog.findByIdAndDelete(blog_id).exec();
    if (!deletedBlog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getUser,
  getUserById,
  deleteUserById,
  getBlog,
  getBlogById,
  getBlogByUserId,
  deleteBlog,
};
