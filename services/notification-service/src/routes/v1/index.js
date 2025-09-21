const express = require("express");

const { infoController, EmailController } = require("../../controllers/index");

const router = express.Router();

router.get("/info", infoController.info);

router.post("/tickets", EmailController.createTicketController);

module.exports = router;
