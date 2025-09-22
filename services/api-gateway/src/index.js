const express = require("express");
const rateLimit = require("express-rate-limit");
const { StatusCodes } = require("http-status-codes");

const { serverConfig } = require("./config/index");
const { logger } = require("./config/index");
const apiRoutes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  logger.info(`API Gateway Server Started At Port: ${serverConfig.PORT}`);
});
