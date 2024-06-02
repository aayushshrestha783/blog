const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date },
  thumbnail: {
    regular: {
      type: String,
    },
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  authorAvatar: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
