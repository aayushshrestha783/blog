const Blog = require("../models/Blog");
const fs = require("fs");
const throwError = require("../middlewares/throwError");

const createBlog = async (req, res) => {
  console.log("inside createBlog");
  try {
    const { title, user } = req.body;
    const { path } = req.file; // Path to the uploaded file
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded" });
    }
    console.log(path);
    // Read the content of the Markdown file
    const content = fs.readFileSync(path, "utf8");
    console.log(title);
    console.log(content);
    // Create a new blog post
    const blog = new Blog({
      title,
      content, // Store the Markdown content as a string
      user,
    });
    await blog.save();

    // Delete the uploaded file after processing
    fs.unlinkSync(path);

    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getBlog = async (req, res) => {
  const blog = await Blog.find();
  res.send(blog);
};

const likeBlog = async (req, res, next) => {
  try {
    const user_id = "66385c02227c9caf4b3d92e0";
    const blog_id = req.params.blogID;
    const blog = await Blog.findById(blog_id).exec();
    if (!blog) {
      return throwError("Blog not found", 404);
    }
    //ToDo: this method has high time complexity so filnd alternatives.
    const alreadyLikedIndex = blog.likedBy.indexOf(user_id);
    if (alreadyLikedIndex !== -1) {
      blog.likes--;
      blog.likedBy.splice(alreadyLikedIndex, 1);
    } else {
      blog.likes++;
      blog.likedBy.push(user_id);
    }
    await blog.save();
    return res.status(200).json({
      message: "Blog liked successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlog,
  createBlog,
  likeBlog,
};
