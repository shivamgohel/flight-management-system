const express = require("express");

const { serverConfig } = require("./config/index");
const { logger } = require("./config/index");
const apiRoutes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware BEFORE mounting API routes
app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`);

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const safeBody = JSON.parse(JSON.stringify(req.body));

    if (safeBody.password) {
      safeBody.password = "***";
    }

    logger.info(`Request Body: ${JSON.stringify(safeBody)}`);
  } else {
    logger.info(`Query Params: ${JSON.stringify(req.query)}`);
  }

  next();
});

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  logger.info(`Server Started At Port: ${serverConfig.PORT}`);
});
