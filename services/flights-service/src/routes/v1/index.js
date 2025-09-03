const express = require("express");
const { logger } = require("../../config/index");

const cityRoutes = require("./city-routes");
const airplaneRoutes = require("./airplane-routes");
const airportRoutes = require("./airport-routes");
const flightRoutes = require("./flight-router");

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

router.use("/cities", cityRoutes);
router.use("/airplanes", airplaneRoutes);
router.use("/airports", airportRoutes);
router.use("/flights", flightRoutes);

module.exports = router;
