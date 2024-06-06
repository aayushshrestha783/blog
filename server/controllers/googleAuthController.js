// googleAuthController.js
const User = require("../models/User");
const { decryptToken } = require("../utils/encryption");
const jwt = require("jsonwebtoken");

exports.renderAuthPage = function (req, res) {
  res.render("pages/auth");
};

exports.handleGoogleCallback = function (req, res) {
  const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "1h" });
  console.log("Generated Token:", token);

  res.cookie("token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });
  console.log("Cookie Set:", res.getHeaders()["set-cookie"]);
  res.redirect("/auth/success");
};

exports.successHandler = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.redirect(302, "http://localhost:3006/home");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.errorHandler = function (req, res) {
  res.send("error logging in");
};

exports.logout = function (req, res, next) {
  res.clearCookie("token");
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res
        .status(500)
        .send("An error occurred during logout. Please try again.");
    }
    res.redirect(302, "http://localhost:3006");
  });
};
