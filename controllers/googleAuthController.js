// googleAuthController.js
const User = require("../models/User");
exports.renderAuthPage = function (req, res) {
  res.render("pages/auth");
};

exports.successHandler = function (req, res) {
  res.send(userProfile);
};

exports.errorHandler = function (req, res) {
  res.send("error logging in");
};

exports.gogleCallbackHandler = async (req, res) => {
  try {
    console.log("inside google callback");
    const existingUser = await User.findOne({
      email: userProfile._json.email,
    });
    console.log(userProfile._json.email);
    if (existingUser) {
      res.render("pages/success");
    } else {
      const newUser = await User.create({
        email: userProfile._json.email,
        name: userProfile._json.name,
      });
      res.render("pages/success");
    }
  } catch (error) {
    res.send(error);
  }
};
