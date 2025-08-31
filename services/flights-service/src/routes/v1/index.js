const express = require("express");
const { logger } = require("../../config/index");

const cityRoutes = require("./city-routes");
const airplaneRoutes = require("./airplane-routes");
<<<<<<< HEAD
=======
const airportRoutes = require("./airport-routes");
>>>>>>> service/flights

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

router.use("/city", cityRoutes);
router.use("/airplane", airplaneRoutes);
<<<<<<< HEAD
=======
router.use("/airport", airportRoutes);
>>>>>>> service/flights

module.exports = router;
