const express = require("express");

const { BookingController } = require("../../controllers");
const {
  validateCreateBookingRequest,
  validateSeatAvailability,
} = require("../../middlewares/index");

const router = express.Router();

router.post(
  "/",
  validateCreateBookingRequest,
  validateSeatAvailability,
  BookingController.createBooking
);

module.exports = router;
