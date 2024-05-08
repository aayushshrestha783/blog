const express = require("express");
const multerUploads = require("../middlewares/multerConfig");
const router = express.Router();

const blogController = require("../controllers/blogController");

router.get("/", blogController.getBlog);
router.get("/:blogID", blogController.getBlogById);
router.post("/", multerUploads.single("content"), blogController.createBlog);
router.put(
  "/:blogID",
  multerUploads.single("content"),
  blogController.updateBlog
);
router.delete("/:blogID", blogController.deleteBlog);

//ROUTES RELATED TO LIKES

router.post("/:blogID/like", blogController.likeBlog);

module.exports = router;
