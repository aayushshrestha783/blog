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
  views: {
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
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  authorAvatar: {
    type: String,
  },
  category: {
    type: [String],
    enum: [
      "Anime",
      "Art",
      "Artist",
      "Back End",
      "Books",
      "Data Engineering",
      "Data Analysis",
      "Design",
      "Database",
      "Front End",
      "History",
      "Literature",
      "Machine Learning",
      "Movies",
      "Philosophy",
      "Science",
      "Sports",
      "Technology",
      "Travel",
      "Web Development",
      "Other",
    ],
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
