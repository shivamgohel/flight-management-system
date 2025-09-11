const axios = require("axios");

const { StatusCodes } = require("http-status-codes");
const { serverConfig } = require("../config/index");

async function validateSeatAvailability(req, res, next) {
  const { flightId, noOfSeats } = req.body;

  try {
    const response = await axios.get(
      `${serverConfig.FLIGHTS_SERVICE}/api/v1/flights/${flightId}`
    );

    const flight = response.data.data;
    if (parseInt(noOfSeats) > flight.totalSeats) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Not enough seats available",
        data: {},
        error: `only ${flight.totalSeats} seats available`,
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Could not validate Seat Availability",
      data: {},
      error: error.message,
    });
  }
}

module.exports = validateSeatAvailability;
