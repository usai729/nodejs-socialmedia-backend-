const express = require("express");
const multer = require("multer");

const Route = express.Router();

const verifytoken = require("../Middleware/verifytoken");
const {
  newpost,
  fetchpost,
  addComment,
  deleteComment,
  updatepost,
  deletepost,
  allposts_brief,
} = require("../Controllers/Post");
const { body } = require("express-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Assets");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

Route.route("/new").post(verifytoken, upload.single("image"), newpost);
Route.route("/fetch").get(allposts_brief);
Route.route("/p/:postid").get(fetchpost);
Route.route("/updatepost").put(verifytoken, updatepost);
Route.route("/deletepost/:postid").delete(verifytoken, deletepost);
Route.route("/addcomment").post(verifytoken, addComment);
Route.route("/remotecomment/:cid").delete(verifytoken, deleteComment);

module.exports = Route;
