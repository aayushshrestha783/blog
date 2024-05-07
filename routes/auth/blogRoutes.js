const express = require("express");
const multerUploads = require("../../middlewares/multerConfig");
const router = express.Router();

const blogController = require("../../controllers/blogController");

//TODO: ADD AUTH MIDDLEWARE AND MANAGE ROLE PERMISSIONS

// ROUTES RELATED TO ART

router.get("/", blogController.getBlog);
//router.post("/", blogController.createBlog);
router.post("/", multerUploads.single("content"), blogController.createBlog);

module.exports = router;
