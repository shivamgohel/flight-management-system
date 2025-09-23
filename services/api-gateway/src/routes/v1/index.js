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
 * They are defined separately in the flightsRoutes module for better modularity.
 *
 * Examples of endpoints include:
 * - POST   /flights           → Create a new flight record (with validations)
 * - GET    /flights           → Retrieve all flights
 * - GET    /flights/:id       → Retrieve flight details by ID
 * - PATCH  /flights/:id/seats → Update seat availability for a flight
 *
 * - GET    /cities            → Retrieve all cities
 * - GET    /cities/:id        → Retrieve city details by ID
 * - POST   /cities            → Create a new city
 * - PATCH  /cities/:id        → Update city information
 * - DELETE /cities/:id        → Delete a city
 *
 * - GET    /airports          → Retrieve all airports
 * - GET    /airports/:id      → Retrieve airport details by ID
 * - POST   /airports          → Create a new airport
 * - PATCH  /airports/:id      → Update airport information
 * - DELETE /airports/:id      → Delete an airport
 *
 * - GET    /airplanes         → Retrieve all airplanes
 * - GET    /airplanes/:id     → Retrieve airplane details by ID
 * - POST   /airplanes         → Create a new airplane
 * - PATCH  /airplanes/:id     → Update airplane information
 * - DELETE /airplanes/:id     → Delete an airplane
 *
 * The API Gateway acts as a reverse proxy forwarding flight-related requests
 * to the Flight Service, ensuring separation of concerns and scalable architecture.
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
