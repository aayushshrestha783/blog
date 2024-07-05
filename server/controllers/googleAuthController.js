// googleAuthController.js
const User = require("../models/User");
const { decryptToken } = require("../utils/encryption");
const jwt = require("jsonwebtoken");

exports.renderAuthPage = function (req, res) {
  res.render("pages/auth");
};

exports.handleGoogleCallback = function (req, res) {
  const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: "blog-xi-ivory-70.vercel.app", // Updated to match your specific subdomain
    path: "/",
    maxAge: 3600000, // 1 hour in milliseconds
  });
  res.redirect("https://blog-8g9y.onrender.com/auth/success");
};

exports.successHandler = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.redirect(302, "https://blog-xi-ivory-70.vercel.app/home");
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
    res.status(200).send({ success: true, message: "Logged out sucessfully." });
  });
};
