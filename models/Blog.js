const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date },
  likes: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
