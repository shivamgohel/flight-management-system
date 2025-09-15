const bcrypt = require("bcrypt");

const { serverConfig } = require("../../config/index");

const rounds = Number.parseInt(serverConfig.SALT_ROUNDS, 10);
const SALT_ROUNDS = Number.isInteger(rounds) && rounds > 0 ? rounds : 10;

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = {
  hashPassword,
};
