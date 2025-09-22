const express = require("express");

const { infoController } = require("../../controllers/index");
const flightsRoutes = require("./flights-routes");
const authRoutes = require("./auth-routes");

const router = express.Router();

/**
 * GET /info
 *
 * Health check or status endpoint for the API.
 * This is useful for  simply verifying that the API Gateway is running.
 */
router.get("/info", infoController.info);

/**
 * Mount flights-related routes.
 *
 * These routes handle all requests related to flights, cities, airports, and airplanes.
 * The routes are defined separately in the flightsRoutes module for better modularity.
 *
 * Example:
 * - /flights
 * - /cities
 * - /airports
 * - /airplanes
 */
router.use(flightsRoutes);

/**
 * Mount authentication-related routes.
 *
 * These routes handle all requests related to user authentication and authorization,
 * including signup, signin, role assignment, and user management.
 * They are defined in the authRoutes module for clear separation of concerns.
 *
 * Example routes:
 * - /auth/signup
 * - /auth/signin
 * - /auth/users/:id/roles
 * - /auth/users/:id
 */
router.use(authRoutes);

module.exports = router;
