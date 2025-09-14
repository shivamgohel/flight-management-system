const express = require("express");

const { AuthController } = require("../../controllers/index");
const { validateSignup } = require("../../middlewares/index");

const router = express.Router();

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", validateSignup, AuthController.signup);

module.exports = router;
