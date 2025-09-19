const express = require("express");

const { infoController } = require("../../controllers/index");

const router = express.Router();

router.get("/info", infoController.info);

module.exports = router;
