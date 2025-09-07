const express = require("express");

const { Logger } = require("../../config/index");
const { infoController } = require("../../controllers/index");

const router = express.Router();

// Logger middleware for all routes
router.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`);

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  } else {
    logger.info(`Query Params: ${JSON.stringify(req.query)}`);
  }

  next();
});

router.get("/info", infoController.info);

module.exports = router;
