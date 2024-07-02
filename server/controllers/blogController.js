const Blog = require("../models/Blog");
const fs = require("fs");
const throwError = require("../middlewares/throwError");
const cloudinary = require("../config/cloudinary_config");

//create blog
const createBlog = async (req, res) => {
  try {
    const { title, author } = req.body;
    let content;
    let thumbnail;

    if (req.files && req.files.markdownFile) {
      // If a file has been uploaded, read its content

      const contentPath = req.files.markdownFile[0].path; // Path to the uploaded file
      content = fs.readFileSync(contentPath, "utf8");
      // Delete the uploaded file after processing
      fs.unlinkSync(contentPath);
    } else {
      content = req.body.content;
    }

    if (!content) {
      return res
        .status(400)
        .json({ success: false, error: "Content is required" });
    }

    if (req.files && req.files.thumbnail) {
      const thumbnailPath = req.files.thumbnail[0].path;
      const result = await cloudinary.uploader.upload(thumbnailPath);
      thumbnail = result.secure_url;
      fs.unlinkSync(thumbnailPath);
    }

    const blog = new Blog({
      title,
      content, // Store the Markdown content as a string
      author,
      thumbnail: { regular: thumbnail },
    });

    await blog.save();
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//get all blog
const getBlog = async (req, res) => {
  try {
    const user_id = req.params.userID;
    const blogs = await Blog.find().populate("author", "name");
    console.log(user_id);
    const blogsWithLikeStatus = blogs.map((blog) => {
      const isLiked = blog.likedBy.includes(user_id);
      return { ...blog.toObject(), isLiked };
    });
    res.status(201).json({ success: true, blog: blogsWithLikeStatus });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
//get blog by id
const getBlogById = async (req, res) => {
  try {
    const blog_id = req.params.blogID;
    let blog = await Blog.findById(blog_id).populate("author", "name");
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
    const author_id = req.params.authorID;
    const user_id = req.params.userID;
    console.log(author_id);
    console.log(user_id);
    const blogs = await Blog.find({ author: author_id }).populate(
      "author",
      "name"
    );
    if (!blogs) {
      return res
        .status(404)
        .json({ success: false, error: "No blog posted by user" });
    }
    const blogsWithLikeStatus = blogs.map((blog) => {
      const isLiked = blog.likedBy.includes(user_id);
      return { ...blog.toObject(), isLiked };
    });
    res.status(201).json({ success: true, blog: blogsWithLikeStatus });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//like handler
const likeBlog = async (req, res, next) => {
  try {
    const user_id = req.params.userID;
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

//update blog
const updateBlog = async (req, res) => {
  try {
    const blog_id = req.params.blogID;
    const { title, user } = req.body;
    let content;
    // Find the blog post by ID
    let blog = await Blog.findById(blog_id).exec();
    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }
    if (req.file) {
      // If a file has been uploaded, read its content
      const { path } = req.file; // Path to the uploaded file
      content = fs.readFileSync(path, "utf8");
      // Delete the uploaded file after processing
      fs.unlinkSync(path);
    } else {
      // If no file has been uploaded, use the title and user fields from the request body
      content = req.body.content;
    }
    if (!content) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded" });
    }
    blog.title = title;
    blog.user = user;
    blog.content = content;
    await blog.save();

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
  getBlog,
  createBlog,
  likeBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getBlogByUserId,
};
