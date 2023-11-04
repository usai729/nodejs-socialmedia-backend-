const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  dp: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fromCountry: {
    type: String,
    default: "IN",
  },
  about: {
    type: String,
    default: "Keep calm and travel on ✈️",
  },
});
const User = mongoose.model("User", UserModel);
User.createIndexes();

const Following = new mongoose.Schema({
  of: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const FollowingModel = mongoose.model("Following", Following);

const Followers = new mongoose.Schema({
  of: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const FollowersModel = mongoose.model("Followers", Followers);

module.exports = {
  User: User,
  Following: FollowingModel,
  Followers: FollowersModel,
};
