// googleAuthController.js
const User = require("../models/User");

exports.renderAuthPage = function (req, res) {
  res.render("pages/auth");
};

exports.successHandler = async function (req, res) {
  try {
    const userProfile = req.user.profile;
    const existingUser = await User.findOne({
      email: userProfile._json.email,
    });
    console.log(userProfile._json.email);
    if (!existingUser) {
      await User.create({
        email: userProfile._json.email,
        name: userProfile._json.name,
      });
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
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return next(err); // Pass error to middleware for proper handling
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res
          .status(500)
          .send("An error occurred during logout. Please try again.");
      }
      res.redirect("/auth"); // Redirect to the login page after successful logout
    });
  });
};
