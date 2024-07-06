// googleAuthController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const front_end_uri = process.env.PROD_API;

exports.renderAuthPage = function (req, res) {
  res.render("pages/auth");
};

exports.handleGoogleCallback = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(user._id);
    // Send the token in the response body
    res.redirect(`${front_end_uri}?token=${token}`);
  } catch (error) {
    console.error("Error in Google callback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
