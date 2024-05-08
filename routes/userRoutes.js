const express = require("express");
const multerUploads = require("../middlewares/multerConfig");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.get("/:userID", userController.getUserById);
router.delete("/:userID", userController.deleteUserById);

module.exports = router;
