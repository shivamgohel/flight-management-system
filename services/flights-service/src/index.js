const express = require("express");

const { PORT } = require("./config");

const setupAndStartServer = async () => {
  const app = express();

  app.listen(PORT, () => {
    console.log(`Server Started At Port: ${PORT}`);
  });
};

setupAndStartServer();
