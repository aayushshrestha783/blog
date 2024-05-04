const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/googleAuthController");

router.get("/", authController.renderAuthPage);

router.get("/success", authController.successHandler);

router.get("/error", authController.errorHandler);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/auth/success");
  }
);

module.exports = router;
