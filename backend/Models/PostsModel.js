const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  postBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const PostModel = mongoose.model("Post", Post);

const Comment = new mongoose.Schema({
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  content: {
    type: String,
  },
});
const CommentsModel = mongoose.model("Comment", Comment);

const Likes = new mongoose.Schema({
  likeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likedOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});
const LikesModel = mongoose.model("Likes", Likes);

module.exports = {
  Post: PostModel,
  Comment: CommentsModel,
  Likes: LikesModel,
};
