const express = require("express");
const multerUploads = require("../config/multerConfig");
const router = express.Router();

const blogController = require("../controllers/blogController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
// Routes for fetching blogs
router.get("/home/:userID", blogController.getBlog);

router.get(
  "/userPost/:authorID/:userID",
  isAuthenticated,
  blogController.getBlogByUserAuthorId
);

router.get(
  "/userPost/:userID",
  isAuthenticated,
  blogController.getBlogByUserId
);

router.get("/:blogID", isAuthenticated, blogController.getBlogById);

// Routes for creating, updating, and deleting blogs
router.post(
  "/",
  isAuthenticated,
  multerUploads.fields([
    { name: "thumbnail", maxcount: 1 },
    { name: "markdownFile", maxCount: 1 },
  ]),
  blogController.createBlog
);
router.put(
  "/:blogID",
  isAuthenticated,
  multerUploads.fields([
    { name: "thumbnail", maxcount: 1 },
    { name: "markdownFile", maxCount: 1 },
  ]),
  blogController.updateBlog
);
router.delete("/:blogID", blogController.deleteBlog);

// Route for handling blog likes
router.post("/:blogID/:userID", blogController.likeBlog);

module.exports = router;
