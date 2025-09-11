const express = require("express");

const { BookingController } = require("../../controllers");
const {
  validateCreateBookingRequest,
  validateSeatAvailability,
  validateStatusUpdate,
} = require("../../middlewares/index");

const router = express.Router();

/**
 * @route   POST /api/v1/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post(
  "/",
  validateCreateBookingRequest,
  validateSeatAvailability,
  BookingController.createBooking
);

/**
 * @route   GET /api/v1/bookings/:id
 * @desc    Get a booking by ID
 * @access  Public
 */
router.get("/:id", BookingController.getBooking);

/**
 * @route   GET /api/v1/bookings
 * @desc    Get all bookings
 * @access  Public
 */
router.get("/", BookingController.getAllBookings);

/**
 * @route   PATCH /api/v1/bookings/:id
 * @desc    Update booking status
 * @access  Public
 */
router.patch("/:id", validateStatusUpdate, BookingController.updateBooking);

/**
 * @route   PATCH /api/v1/bookings/:id/cancel
 * @desc    Cancel a booking (sets status to 'CANCELLED')
 * @access  Public
 */
router.patch("/:id/cancel", BookingController.cancelBooking);

module.exports = router;
