const express = require("express");

const { CityController } = require("../../controllers/index");
const { logger } = require("../../config/index");

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

router.get("/city/:id", CityController.get);
router.get("/city", CityController.getAll);
router.get("/cities", CityController.search);
router.post("/city", CityController.create);
router.patch("/city/:id", CityController.update);
router.delete("/city/:id", CityController.destroy);

module.exports = router;
