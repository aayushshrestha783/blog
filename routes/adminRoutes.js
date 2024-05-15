const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");

const adminController = require("../controllers/adminController");
//user handler
router.get("/user", isAuthenticated, adminController.getUser);
router.get("/user/:userID", isAuthenticated, adminController.getUserById);
router.delete("/user/:userID", isAuthenticated, adminController.deleteUserById);
//blog handler
router.get("/blog", isAuthenticated, adminController.getBlog);
router.get(
  "/blog/userPost/:userID",
  isAuthenticated,
  adminController.getBlogByUserId
);
router.get("/blog/:blogID", isAuthenticated, adminController.getBlogById);
router.delete("/blog/:blogID", isAuthenticated, adminController.deleteBlog);

module.exports = router;
