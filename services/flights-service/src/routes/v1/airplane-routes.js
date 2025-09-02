const express = require("express");

const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

const router = express.Router();

//static routes
router.get("/", AirplaneController.getAll);

//dynamic routes
router.get("/:id", AirplaneController.get);
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.create
);
router.patch("/:id", AirplaneController.update);
router.delete("/:id", AirplaneController.destroy);

module.exports = router;
