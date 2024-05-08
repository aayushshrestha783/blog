const express = require("express");
const router = express.Router();
const passport = require("../middlewares/passportConfig");
const authController = require("../controllers/googleAuthController");

router.use(passport.initialize());
router.use(passport.session());

router.get("/", authController.renderAuthPage);

router.get("/success", authController.successHandler);

router.get("/error", authController.errorHandler);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.gogleCallbackHandler
);

module.exports = router;