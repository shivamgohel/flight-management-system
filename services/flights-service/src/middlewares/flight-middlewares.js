const { StatusCodes } = require("http-status-codes");

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Flight Number was not found in the incoming request",
      error: { details: "Missing required field: flightNumber" },
    });
  }
  if (!req.body.airplaneId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Airplane ID was not found in the incoming request",
      error: { details: "Missing required field: airplaneId" },
    });
  }
  if (!req.body.departureAirportId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Departure Airport ID was not found in the incoming request",
      error: { details: "Missing required field: departureAirportId" },
    });
  }
  if (!req.body.arrivalAirportId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message:
        "Arrival Airport ID Number was not found in the incoming request",
      error: { details: "Missing required field: arrivalAirportId" },
    });
  }
  if (!req.body.departureTime) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Departure Time was not found in the incoming request",
      error: { details: "Missing required field: departureTime" },
    });
  }
  if (!req.body.arrivalTime) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Arrival Time was not found in the incoming request",
      error: { details: "Missing required field: arrivalTime" },
    });
  }
  if (!req.body.price) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Price was not found in the incoming request",
      error: { details: "Missing required field: price" },
    });
  }
  if (!req.body.totalSeats) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Seats was not found in the incoming request",
      error: { details: "Missing required field: totalSeats" },
    });
  }
  next();
}

function validateUpdateSeatsRequest(req, res, next) {
  if (!req.body.seats) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "seats was not found in the incoming request",
      error: { details: "Missing required field: seats" },
    });
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateSeatsRequest,
};
