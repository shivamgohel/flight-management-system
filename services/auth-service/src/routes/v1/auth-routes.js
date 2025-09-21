const express = require("express");

const { AuthController } = require("../../controllers/index");
const {
  validateSignup,
  validateSignin,
  isAuthenticated,
  isAuthorized,
} = require("../../middlewares/index");
const { Enums } = require("../../utils/index");
const { ADMIN } = Enums.USER_ROLES_ENUMS;

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

/**
 * @route   POST /api/v1/auth/users/:id/roles
 * @desc    Assign a role to a user by user ID
 * @access  Protected
 */
router.post(
  "/users/:id/roles",
  isAuthenticated,
  isAuthorized([ADMIN]),
  AuthController.addRoleToUser
);

/**
 * @route GET /auth/users/:id
 * @desc Fetch a user by ID
 * @access Protected (authenticated users only)
 */
router.get(
  "/users/:id",
  // isAuthenticated, // require login
  // isAuthorized([ADMIN]),
  AuthController.getUser
);

module.exports = router;
