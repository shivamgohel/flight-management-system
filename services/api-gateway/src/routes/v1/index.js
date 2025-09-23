const express = require("express");

const { infoController } = require("../../controllers/index");
const flightsRoutes = require("./flights-routes");
const authRoutes = require("./auth-routes");
const bookingRoutes = require("./booking-routes");
const notificationRoutes = require("./notification-routes");

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

/**
 * Mount booking-related routes.
 *
 * These routes proxy all booking-related requests to the Booking Service.
 * Examples of proxied endpoints include:
 * - POST   /bookings           → Create a new booking (with validations)
 * - GET    /bookings/:id       → Retrieve booking by ID
 * - GET    /bookings           → Retrieve all bookings
 * - PATCH  /bookings/:id       → Update booking status
 * - PATCH  /bookings/:id/cancel→ Cancel a booking
 *
 * All booking routes are protected by authentication middleware to ensure
 * only authorized users can perform booking operations.
 *
 * The API Gateway handles user authentication, forwards user identity and roles
 * via headers to the Booking Service for downstream authorization checks.
 */
router.use(bookingRoutes);

/**
 * Mount notification-related routes.
 *
 * These routes handle all requests related to notifications and email operations.
 * Examples of endpoints include:
 * - GET    /notifications/info     → Health check for Notification Service
 * - POST   /notifications/tickets  → Create/send a ticket notification email
 *
 * The API Gateway acts as a reverse proxy forwarding notification-related requests
 * to the Notification Service to keep the architecture modular and scalable.
 */
router.use("/notifications", notificationRoutes);

module.exports = router;
