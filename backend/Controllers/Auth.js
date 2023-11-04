const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const { User } = require("../Models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const name = req.body.name;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const verify = await User.findOne({ email: email });
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  if (verify) {
    return res.status(409).json({
      msg: "Email exists",
    });
  }

  try {
    User.create({
      email: email,
      password: hash,
      displayName: name,
    })
      .then((user) => {
        const token = jwt.sign(
          {
            id: user.id,
          },
          JWT_SECRET
        );

        res.status(200).json({
          created: true,
          id: user.id,
          token: token,
        });
      })
      .catch((e) =>
        res.status(400).json({ error: true, msg: e, created: false })
      );
  } catch (e) {
    res.status(400).json({ error: true, msg: e, created: false });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;

  if (!errors.isEmpty()) {
    res.json({
      error: true,
      msg: errors,
    });
  }

  try {
    const finduser = await User.findOne({ email: email });

    if (!finduser) {
      res.status(401).json({
        error: true,
        message: "User with email does not exist",
      });
    } else {
      const matchPassword = await bcrypt.compare(password, finduser.password);

      if (!matchPassword) {
        res.status(401).json({
          error: true,
          message: "Invalid credentials",
        });
      } else {
        const token = jwt.sign(
          {
            id: finduser.id,
          },
          JWT_SECRET
        );

        res.status(200).json({
          error: false,
          token: token,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

exports.getuser = async (req, res) => {
  res.json({ error: false, msg: req.user });
};
