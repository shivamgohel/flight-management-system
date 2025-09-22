const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRY } = require("../../config/server-config");

function createToken(payload) {
  const options = {
    expiresIn: JWT_EXPIRY,
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
