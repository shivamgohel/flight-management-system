const express = require("express");

const { AuthController } = require("../../controllers/index");
const { validateSignup, validateSignin } = require("../../middlewares/index");

const router = express.Router();

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", validateSignup, AuthController.signup);

/**
 * @route   POST /api/v1/auth/signin
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */
router.post("/signin", validateSignin, AuthController.signin);

module.exports = router;
