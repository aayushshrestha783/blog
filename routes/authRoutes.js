const express = require("express");
const session = require("express-session");
const router = express.Router();
const passport = require("../middlewares/passportConfig");
const authController = require("../controllers/googleAuthController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
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
    successRedirect: "/auth/success",
    failureRedirect: "/error",
  })
);
router.get("/", authController.renderAuthPage);

router.get("/success", isAuthenticated, authController.successHandler);

router.get("/error", authController.errorHandler);

router.get("/logout", authController.logout);

module.exports = router;
