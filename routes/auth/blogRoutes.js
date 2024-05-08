const express = require("express");
const multerUploads = require("../../middlewares/multerConfig");
const router = express.Router();

const blogController = require("../../controllers/blogController");

router.get("/", blogController.getBlog);
router.post("/", multerUploads.single("content"), blogController.createBlog);

//ROUTES RELATED TO LIKES

router.post("/:blogID/like", blogController.likeBlog);

module.exports = router;
