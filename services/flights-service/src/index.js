const express = require("express");

const { PORT, logger } = require("./config");

const setupAndStartServer = async () => {
  const app = express();

  app.listen(PORT, () => {
    logger.info(`Server Started At Port: ${PORT}`);
  });
};

setupAndStartServer();
