const express = require("express");

const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

const router = express.Router();

// static routes
router.get("/search", CityController.search);
router.get("/", CityController.getAll);

// dynamic routes
router.get("/:id", CityController.get);
router.post("/", CityMiddlewares.validateCreateRequest, CityController.create);
router.patch("/:id", CityController.update);
router.delete("/:id", CityController.destroy);

module.exports = router;
