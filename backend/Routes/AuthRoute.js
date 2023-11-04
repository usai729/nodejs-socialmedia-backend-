const express = require("express");
const { body } = require("express-validator");

const { login, signup, getuser } = require("../Controllers/Auth");
const verifytoken = require("../Middleware/verifytoken");

const Route = express.Router();

Route.post("/login", [body("email").isEmail()], login);
Route.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  signup
);
Route.route("/getuser").post(verifytoken, getuser);

module.exports = Route;
