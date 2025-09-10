const express = require("express");

const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.create
);

router.get("/", FlightController.getAll);
router.get("/:id", FlightController.get);

// /api/v1/flights/:id/seats PATCH
router.patch(
  "/:id/seats",
  FlightMiddlewares.validateUpdateSeatsRequest,
  FlightController.updateSeats
);

module.exports = router;
