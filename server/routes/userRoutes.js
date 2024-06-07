const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");

const userController = require("../controllers/userController");

router.get("/", isAuthenticated, userController.getUser);
router.get("/:userID", userController.getUserById);
router.delete("/:userID", isAuthenticated, userController.deleteUserById);

module.exports = router;
