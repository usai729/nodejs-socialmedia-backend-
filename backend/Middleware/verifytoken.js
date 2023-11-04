const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = verifytoken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: true, msg: "Invalid token" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: true, msg: "Failed to authenticate token" });
    }

    // If the token is valid, you can access the decoded payload
    req.user = decoded.id;

    next();
  });
};
