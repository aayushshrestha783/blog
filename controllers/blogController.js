const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, content, user } = req.body;
    console.log(title);

    // Create a new blog post
    const blog = new Blog({
      title,
      content,
      user,
    });
    await blog.save();

    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getBlog = async (req, res) => {
  const blog = await Blog.find();
  res.send(blog);
};
