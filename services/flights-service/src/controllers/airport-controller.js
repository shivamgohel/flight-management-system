const { StatusCodes } = require("http-status-codes");

const { logger } = require("../config");
const { AirportService: airportService } = require("../services/index");

const create = async (req, res) => {
  try {
    const airport = await airportService.createAirport(req.body);
    return res.status(StatusCodes.CREATED).json({
      data: airport,
      success: true,
      message: "Successfully Created Airport",
      error: {},
    });
  } catch (error) {
    logger.error("Not Able to Create Airport at Aiport Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to Create Airport at Airport Controller Layer",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const airport = await airportService.getAirport(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: airport,
      success: true,
      message: "Successfully fetched the Airport",
      error: {},
    });
  } catch (error) {
    logger.error("Not able to Fetch the Airport at Airport Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to Fetch the Aiport at Airport Controller Layer",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const airports = await airportService.getAllAirports();
    return res.status(StatusCodes.OK).json({
      data: airports,
      success: true,
      message: "Successfully fetched Airports",
      error: {},
    });
  } catch (error) {
    logger.error("Not able to Fetch the Aiports at Airport Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to Fetch the Airports at Airport Controller Layer",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const airport = await airportService.updateAirport(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      data: airport,
      success: true,
      message: "Successfully updated the Airport",
      error: {},
    });
  } catch (error) {
    logger.error("Not Able to Update the Airport");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to Update the Airport at Airport Controller Layer",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const result = await airportService.deleteAirport(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: result,
      success: true,
      message: "Successfully deleted the Airport",
      error: {},
    });
  } catch (error) {
    logger.error("Not able to Delete the Airport at Airport Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to Delete the Airport at Airport Controller Layer",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  get,
  getAll,
  update,
  destroy,
};
