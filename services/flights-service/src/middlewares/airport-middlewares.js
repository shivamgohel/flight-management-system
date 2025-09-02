const { StatusCodes } = require("http-status-codes");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Name was not found in the incoming request",
      error: { details: "Missing required field: name" },
    });
  }
  if (!req.body.code) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Code was not found in the incoming request",
      error: { details: "Missing required field: code" },
    });
  }
  if (!req.body.cityId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "CityId was not found in the incoming request",
      error: { details: "Missing required field: cityId" },
    });
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
