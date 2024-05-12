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
    if (existingUser) {
      res.render("pages/success", { user: req.user });
    } else {
      await User.create({
        email: userProfile._json.email,
        name: userProfile._json.name,
      });
      res.render("pages/success", { user: req.user });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.errorHandler = function (req, res) {
  res.send("error logging in");
};

exports.logout = function (req, res) {
  res.redirect("/auth");
};
