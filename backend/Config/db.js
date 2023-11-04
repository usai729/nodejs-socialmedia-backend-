const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI);

if (mongoose.connection) {
  console.log("Connected to database");
}
