const { Likes, Post } = require("../Models/PostsModel");
const { Following, Followers } = require("../Models/UserModel");

exports.follow = async (req, res) => {
  var { id } = req.body;

  try {
    let followingResults = await Following.findById(req.user);
    let followersResults = await Followers.findById(id);

    if (followingResults) {
      await Following.updateOne(
        { of: req.user },
        { $push: { followings: id } }
      );
    } else {
      Following.create({
        of: req.user,
        followings: [id],
      });
    }

    if (followersResults) {
      await Followers.updateOne({ of: id }, { $push: { follower: req.user } });
    } else {
      Followers.create({
        of: id,
        follower: [req.user],
      });
    }

    res.json({ errors: false, msg: "followed" });
  } catch (error) {
    console.log(error);
    res.json({ errors: true, msg: error });
  }
};

exports.removeFollower = async (req, res) => {
  console.log(this.removeFollower);
};

exports.like = async (req, res) => {
  var { postid } = req.body;

  const post = await Post.find({ _id: postid });

  try {
    let likeExists = await Likes.findOne({
      $and: [{ likeBy: req.user }, { likedOn: postid }],
    });

    if (likeExists) {
      await Likes.deleteOne({
        $and: [{ likeBy: req.user }, { likedOn: postid }],
      });
      await post[0].updateOne({ $inc: { likeCount: -1 } });
    } else {
      await Likes.create({
        likeBy: req.user,
        likedOn: postid,
      })
        .then(async (r) => {
          if (r) {
            await post[0].updateOne({ $inc: { likeCount: 1 } });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    res.json({ errors: false, msg: "action successfull/like_unlike" });
  } catch (error) {
    console.log(error);

    res.json({ errors: true, msg: error });
  }
};
