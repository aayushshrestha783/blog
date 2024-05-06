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

exports.gogleCallbackHandler = async (req, res, next) => {
  try {
    console.log("inside google callback");
    const existingUser = await User.findOne({
      email: userProfile.emails[0].value,
    });
    console.log(userProfile._json.email);
    if (existingUser) {
      res.send("existing User");
    } else {
      const newUser = await User.create({
        email: userProfile._json.email,
        name: userProfile._json.name,
      });
      res.send("new_user_created");
    }
  } catch (error) {
    res.send(error);
  }
};
