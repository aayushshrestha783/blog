const express = require("express");
const router = express.Router();
const passport = require("../middlewares/passportConfig");
const authController = require("../controllers/googleAuthController");

router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/google",
  passport.authenticate("google", {
    accessType: "offline",
    prompt: "consent",
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
  }),
  authController.handleGoogleCallback
);

router.get("/success", authController.successHandler);

router.get("/error", authController.errorHandler);

router.get("/logout", authController.logout);

module.exports = router;
