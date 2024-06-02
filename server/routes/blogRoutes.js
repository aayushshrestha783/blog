const express = require("express");
const multerUploads = require("../config/multerConfig");
const router = express.Router();

const blogController = require("../controllers/blogController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
// Routes for fetching blogs
router.get("/", blogController.getBlog);
router.get(
  "/userPost/:userID",
  isAuthenticated,
  blogController.getBlogByUserId
);
router.get("/:blogID", isAuthenticated, blogController.getBlogById);

// Routes for creating, updating, and deleting blogs
router.post(
  "/",

  multerUploads.fields([
    { name: "content", maxcount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  blogController.createBlog
);
router.put(
  "/:blogID",

  multerUploads.fields([
    { name: "content", maxcount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  blogController.updateBlog
);
router.delete("/:blogID", isAuthenticated, blogController.deleteBlog);

// Route for handling blog likes
router.post("/:blogID/like", isAuthenticated, blogController.likeBlog);

module.exports = router;
