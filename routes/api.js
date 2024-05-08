const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");
const userRoutes = require("./userRoutes");

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);
router.use("/user", userRoutes);

module.exports = router;
