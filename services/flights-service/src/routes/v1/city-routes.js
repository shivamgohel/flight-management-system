const express = require("express");
const { CityController } = require("../../controllers");

const router = express.Router();

// static routes
router.get("/search", CityController.search);
router.get("/", CityController.getAll);

// dynamic routes
router.get("/:id", CityController.get);
router.post("/", CityController.create);
router.patch("/:id", CityController.update);
router.delete("/:id", CityController.destroy);

module.exports = router;
