const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { encryptToken, decryptToken } = require("../utils/encryption");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  occupation: { type: String, default: "What do you do? Edit your Profile" },
  bio: {
    type: String,
    default: "Tell us more about yourself. Edit yout Profile",
  },
  accessToken: { type: String },
  refreshToken: { type: String },
});

// Encrypt tokens before saving
userSchema.pre("save", function (next) {
  if (this.isModified("accessToken")) {
    this.accessToken = encryptToken(this.accessToken);
  }
  if (this.isModified("refreshToken")) {
    this.refreshToken = encryptToken(this.refreshToken);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
