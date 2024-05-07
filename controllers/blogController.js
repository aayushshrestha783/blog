const Blog = require("../models/Blog");
const fs = require("fs");

// exports.createBlog = async (req, res) => {
//   try {
//     const { title, content, user } = req.body;
//     console.log(title);

//     // Create a new blog post
//     const blog = new Blog({
//       title,
//       content,
//       user,
//     });
//     await blog.save();

//     res.status(201).json({ success: true, blog });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

exports.createBlog = async (req, res) => {
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

exports.getBlog = async (req, res) => {
  const blog = await Blog.find();
  res.send(blog);
};
