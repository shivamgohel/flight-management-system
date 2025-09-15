const express = require("express");

const { infoController } = require("../../controllers/index");
const authRoutes = require("./auth-routes");

const router = express.Router();

router.get("/info", infoController.info);

router.use("/auth", authRoutes);

module.exports = router;
