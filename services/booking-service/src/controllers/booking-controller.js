const { BookingService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { logger } = require("../config/index");

async function createBooking(req, res) {
  try {
    const response = await BookingService.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      noOfSeats: req.body.noOfSeats,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Booking created Successfully",
      data: response,
      error: {},
    });
  } catch (error) {
    logger.error("Not able to Create a booking in Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "not able to create Booking",
      data: {},
      error: error.message,
    });
  }
}

async function getBooking(req, res) {
  try {
    const bookingId = req.params.id;
    const booking = await BookingService.getBooking(bookingId);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
      error: {},
    });
  } catch (error) {
    logger.error("not able to fetch the Booking", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch the Booking",
      data: {},
      error: error,
    });
  }
}

async function getAllBookings(req, res) {
  try {
    const bookings = await BookingService.getAllBookings();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
      error: {},
    });
  } catch (error) {
    logger.error("Failed to fetch the all Bookings");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "failed to fetch all Bookings",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createBooking,
  getBooking,
  getAllBookings,
};
