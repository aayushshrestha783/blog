const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const multerConfig = require("./middlewares/multerConfig");
const api = require("./routes/api");
app.set("view engine", "ejs");

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", api);

// Catch-all route for unknown API routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
