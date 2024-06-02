const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudianryApiKey,
  api_secret: process.env.cloudianryApiSecret,
});

module.exports = cloudinary;
