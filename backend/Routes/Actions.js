const express = require("express");

const verifytoken = require("../Middleware/verifytoken");
const { follow, like } = require("../Controllers/Actions");

const Route = express.Router();

Route.route("/follow").post(verifytoken, follow);
Route.route("/like").post(verifytoken, like);

module.exports = Route;
