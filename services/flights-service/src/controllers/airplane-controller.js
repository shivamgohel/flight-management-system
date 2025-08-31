const { StatusCodes } = require("http-status-codes");

const { logger } = require("../config/index");
const { AirplaneService: airplaneService } = require("../services/index");

const create = async (req, res) => {
  try {
    const airplane = await airplaneService.createAirplane(req.body);
    return res.status(StatusCodes.CREATED).json({
      data: airplane,
<<<<<<< HEAD
      sucess: true,
=======
      success: true,
>>>>>>> service/flights
      message: "Succesfully Created a airplane",
      error: {},
    });
  } catch (error) {
    logger.error("Airplane Creation failed at Controller");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to Create a aiplane",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const airplane = await airplaneService.getAirplane(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: airplane,
      success: true,
      message: "Successfully fetched the Airpane",
      error: {},
    });
  } catch (error) {
    logger.error("Couldn't Fetch the Airplane At Controller Layer");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not Able to Fetch the Airplane at Controller layer",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const airplanes = await airplaneService.getAllAirplanes();
    return res.status(StatusCodes.OK).json({
      data: airplanes,
      success: true,
      message: "Successfully fetched the Airplanes",
      error: {},
    });
  } catch (error) {
    logger.error("Not able to fetch all the Airplanes at Controller Layer");
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to Fetch all the Airplanes at Controller Layer",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await airplaneService.updateAirplane(
      req.params.id,
      req.body
    );
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully update the Airplane",
      error: {},
    });
  } catch (error) {
    logger.error("Not able to Update the Airplane at Controller Layer");
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to Update the Airplane at Controller Layer",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await airplaneService.deleteAirplane(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully deleted the Airplane",
      error: {},
    });
  } catch (error) {
    logger.error("Not Able to Delete the Airplane at Controller layer");
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not able to Delete the Airplane at Controller Layer",
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
