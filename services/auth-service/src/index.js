const express = require("express");

const { serverConfig } = require("./config/index");
const { logger } = require("./config/index");
const apiRoutes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  logger.info(`Server Started At Port: ${serverConfig.PORT}`);
});
