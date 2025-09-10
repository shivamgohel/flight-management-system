const { StatusCodes } = require("http-status-codes");

const { FlightService } = require("../services");
const { logger } = require("../config");
const { error } = require("winston");

const create = async (req, res) => {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    return res.status(StatusCodes.OK).json({
      data: flight,
      success: true,
      message: "Successfully created a Flight",
      error: {},
    });
  } catch (error) {
    logger.error("Not able to create Flight at Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to create Flight",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    return res.status(StatusCodes.OK).json({
      data: flights,
      success: true,
      message: "Successfully fetched the flights",
      error: {},
    });
  } catch (error) {
    logger.error("Not able to fetch Flights at Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch Flights",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: flight,
      success: true,
      message: "Successfully fetched the flight",
      error: {},
    });
  } catch (error) {
    logger.error("Not able to fetch flight at Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to fetch flight",
      error: error.message,
    });
  }
};

const updateSeats = async (req, res) => {
  try {
    const response = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully updated the seats",
      error: {},
    });
  } catch (error) {
    logger.error("Not able to update seats at Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to update seats",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  get,
  updateSeats,
};
