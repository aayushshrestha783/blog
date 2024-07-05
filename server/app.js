const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const api = require("./routes/api");
require("dotenv").config();

const front_end_api = process.env.PROD_API;
app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(
  cors({
    origin: true, // Frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use("/", api);

// Catch-all route for unknown API routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
