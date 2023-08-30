const jwt = require("jsonwebtoken");

const tokenGeneration = (uid, role) =>
  jwt.sign(
    {
      _id: uid,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

const tokenRefreshGeneration = (uid) =>
  jwt.sign(
    {
      _id: uid,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

module.exports = {
  tokenGeneration,
  tokenRefreshGeneration,
};