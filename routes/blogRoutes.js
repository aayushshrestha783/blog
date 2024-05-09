const express = require("express");
const multerUploads = require("../middlewares/multerConfig");
const router = express.Router();

const blogController = require("../controllers/blogController");

// Routes for fetching blogs
router.get("/", blogController.getBlog);
router.get("/userPost/:userID", blogController.getBlogByUserId);
router.get("/:blogID", blogController.getBlogById);

// Routes for creating, updating, and deleting blogs
router.post("/", multerUploads.single("content"), blogController.createBlog);
router.put(
  "/:blogID",
  multerUploads.single("content"),
  blogController.updateBlog
);
router.delete("/:blogID", blogController.deleteBlog);

// Route for handling blog likes
router.post("/:blogID/like", blogController.likeBlog);

module.exports = router;
