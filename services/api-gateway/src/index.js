const express = require("express");
const rateLimit = require("express-rate-limit");
const { StatusCodes } = require("http-status-codes");

const { serverConfig } = require("./config/index");
const { logger } = require("./config/index");
const apiRoutes = require("./routes/index");

const app = express();

// Global Rate Limiter: 5 requests per 1 minute per IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message: "Too many requests, please try again later.",
    });
  },
});

app.use(limiter);

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  logger.info(`API Gateway Server Started At Port: ${serverConfig.PORT}`);
});
