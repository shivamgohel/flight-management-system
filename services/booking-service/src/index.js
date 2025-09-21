const express = require("express");
const amqplib = require("amqplib");

const { serverConfig } = require("./config/index");
const { queueConfig } = require("./config/index");
const logger = require("./config/logger-config");
const apiRoutes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, async () => {
  logger.info(`Server Started At Port: ${serverConfig.PORT}`);
  await queueConfig.connectQueue();
  logger.info("queue connected");
});
