const { StatusCodes } = require("http-status-codes");

function validateCreateBookingRequest(req, res, next) {
  const { flightId, userId, noOfSeats } = req.body;

  if (!flightId || isNaN(parseInt(flightId))) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'flightId'",
      data: {},
      error: "flightId is required and must be an integer",
    });
  }

  if (!userId || isNaN(parseInt(userId))) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'userId'",
      data: {},
      error: "userId is required and must be an integer",
    });
  }

  if (
    noOfSeats == undefined ||
    isNaN(parseInt(noOfSeats)) ||
    parseInt(noOfSeats) <= 0
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or missing 'noOfSeats'",
      data: {},
      error: "noOfSeats is required and must be an integer",
    });
  }

  next();
}

module.exports = validateCreateBookingRequest;
