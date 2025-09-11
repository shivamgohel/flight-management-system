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

module.exports = {
  createBooking,
};
