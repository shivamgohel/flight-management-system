const express = require("express");

const { AirportController } = require("../../controllers");
const router = express.Router();

router.get("/", AirportController.getAll);

router.get("/:id", AirportController.get);
router.post("/", AirportController.create);
router.patch("/:id", AirportController.update);
router.delete("/:id", AirportController.destroy);

module.exports = router;
