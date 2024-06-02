const multer = require("multer");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Users/aayushshrestha/Desktop/blog/blog/server/markdown"); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  },
});

const multerUploads = multer({ storage: storage });

module.exports = multerUploads;
