const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const api = require("./routes/api");
app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use("/", api);

// app.get("/", authController.renderAuthPage);

// app.use("/auth", authRoutes);

module.exports = app;
