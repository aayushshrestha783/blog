const express = require("express");
const session = require("express-session");

const router = express.Router();

const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");
const userRoutes = require("./userRoutes");

router.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);
router.use("/user", userRoutes);

module.exports = router;
