const { StatusCodes } = require("http-status-codes");

const { logger } = require("../config/index");
const { CityService } = require("../services/index");

const cityService = new CityService();

const create = async (req, res) => {
  //   logger.info(`Request body: ${JSON.stringify(req.body)}`); // <-- log the whole body
  try {
    const city = await cityService.createCity(req.body);
    return res.status(StatusCodes.CREATED).json({
      data: city,
      success: true,
      message: "Successfully Created a City",
      error: {},
    });
  } catch (error) {
    logger.error(`City Creation Failed At Controller Layer`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not Able to Create a City",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await cityService.deleteCity(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully Deleted a City",
      error: {},
    });
  } catch (error) {
    logger.error(`City Deletion Failed At Controller Layer`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not Able to Delete the City",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const city = await cityService.getCity(req.params.id);
    return res.status(StatusCodes.OK).json({
      data: city,
      success: true,
      message: "Successfully Fetched the City",
      error: {},
    });
  } catch (error) {
    logger.error(`City Fetching Failed At Controller Layer`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not Able to Fetch the City",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await cityService.updateCity(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully Updated the City",
      error: {},
    });
  } catch (error) {
    logger.error(`City Updation Failed At Controller Layer`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Not Able to Update the City",
      error: error.message,
    });
  }
};

const search = async (req, res) => {
  try {
    const { name } = req.query;
    const city = await cityService.searchCity(name);

    if (!city) {
      return res.status(StatusCodes.NOT_FOUND).json({
        data: {},
        success: false,
        message: `City with name ${name} not found`,
        error: {},
      });
    }

    return res.status(StatusCodes.OK).json({
      data: city,
      success: true,
      message: "City found Successfully",
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Unable to Search the City",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  destroy,
  get,
  update,
  search,
};
