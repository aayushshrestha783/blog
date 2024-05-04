// googleAuthController.js

exports.renderAuthPage = function (req, res) {
  res.render("pages/auth");
};

exports.successHandler = function (req, res) {
  res.send(userProfile);
};

exports.errorHandler = function (req, res) {
  res.send("error logging in");
};
