const express = require("express");

const isAuthenticated = function (req, res, next) {
  console.log(req.session);
  if (req.session && req.session.passport && req.session.passport.user) {
    return next();
  } else {
    // Session or user data missing, handle as invalid session
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  isAuthenticated,
};
