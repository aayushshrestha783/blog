const express = require("express");

const router = express.Router();

const authRoutes = require("./auth/authRoutes");
const blogRoutes = require("./auth/blogRoutes");

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
