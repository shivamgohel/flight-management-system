const serverConfig = require("./server-config");
const logger = require("./logger-config");

module.exports = {
  PORT: serverConfig.PORT,
  logger,
};
