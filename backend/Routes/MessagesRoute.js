const express = require("express");
const verifytoken = require("../Middleware/verifytoken");
const { body } = require("express-validator");
const {
  newchat,
  sendmessage,
  getAllChats,
  getChat,
} = require("../Controllers/Messages");

const Route = express.Router();

Route.route("/newchat").post(verifytoken, newchat);
Route.route("/sendmsg").post(verifytoken, sendmessage);
Route.route("/chats").get(verifytoken, getAllChats);
Route.route("/c/:id").get(verifytoken, getChat);

module.exports = Route;
