const multer = require("multer");
const path = require("path");
const { Post, Comment } = require("../Models/PostsModel");
const { validationResult } = require("express-validator");
const { User } = require("../Models/UserModel");

exports.newpost = (req, res) => {
  const filename = req.file.filename;
  const caption = req.body.caption;

  Post.create({
    image: filename,
    caption: caption,
    postBy: req.user,
  })
    .then((r) => {
      res.json({ errors: false, msg: "image uploaded" });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.allposts_brief = async (req, res) => {
  try {
    let posts = await Post.find()
      .sort({ createdAt: -1 })
      .select("-comments")
      .populate({
        path: "postBy",
        model: "User",
        select: ["displayName", "dp"],
      });

    res.json({ errors: false, msg: posts });
  } catch (error) {
    console.log(error);

    return res.json({ errors: true, msg: error });
  }
};

exports.fetchpost = async (req, res) => {
  const postid = req.params.postid;

  try {
    const post = await Post.findById(postid).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "commentBy",
        model: "User",
        select: "displayName",
      },
    });

    if (!post) {
      return res
        .status(403)
        .json({ errors: true, msg: `Post with ID ${postid} not found` });
    }

    res.json({ errors: false, post });
  } catch (error) {
    console.log(error);

    res.status(500).json({ errors: true, msg: "Server error" });
  }
};

exports.updatepost = async (req, res) => {
  const { postid, newCaption } = req.body;

  try {
    await Post.findByIdAndUpdate(postid, {
      $set: {
        caption: newCaption,
      },
    });

    res.json({ errors: false, msg: "post updated" });
  } catch (error) {
    console.log(error);

    res.json({ errors: true, msg: error });
  }
};

exports.deletepost = async (req, res) => {
  const { postid } = req.params;

  try {
    await Post.findByIdAndDelete(postid);
    await Comment.deleteMany({ commentBy: req.user });

    res.json({ errors: false, msg: "post deleted" });
  } catch (error) {
    res.json({ errors: true, msg: error });
  }
};

exports.addComment = async (req, res) => {
  let postid = req.body.post;
  let comment = req.body.content;

  console.log(postid);

  let post = await Post.findById(postid);

  if (!post) {
    return res.json({ errors: true, msg: "post not found" });
  }

  Comment.create({
    commentBy: req.user,
    commentTo: postid,
    content: comment,
  })
    .then(async (r) => {
      post.comments.push(r.id);
      post.save();

      res.json({ errors: false, msg: "comment added" });
    })
    .catch((e) => {
      res.json({ errors: true, msg: e });
    });
};

exports.deleteComment = async (req, res) => {
  const id = req.params.cid;

  const post = await Post.findOne({ comments: id });

  try {
    await Comment.findByIdAndDelete(id).populate("commentBy");

    post.comments = post.comments.filter((comment) => !comment.equals(id));
    await post.save();

    res.json({ errors: false, msg: "deleted" });
  } catch (e) {
    console.log(e);
    res.json({ errors: true, msg: "server error" });
  }
};
