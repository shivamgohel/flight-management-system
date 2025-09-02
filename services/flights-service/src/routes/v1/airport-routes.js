const express = require("express");

const { AirportController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");

const router = express.Router();

router.get("/", AirportController.getAll);

router.get("/:id", AirportController.get);
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.create
);
router.patch("/:id", AirportController.update);
router.delete("/:id", AirportController.destroy);

module.exports = router;
