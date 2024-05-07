const express = require("express");
const multer = require("multer");
const router = express.Router();

const multerUploads = multer();
const blogController = require("../../controllers/blogController");
//TODO: ADD AUTH MIDDLEWARE AND MANAGE ROLE PERMISSIONS

// ROUTES RELATED TO ART

router.get("/", blogController.getBlog);
router.post("/", blogController.createBlog);
module.exports = router;
// router.get("/:id", artController.getArtById);

// router.post("/", multerUploads, artController.postArt);

// router.delete("/:id", artController.deleteArt);
