const { StatusCodes } = require("http-status-codes");

function validateCreateRequest(req, res, next) {
  if (!req.body.city) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "City was not found in the incoming request",
      error: { details: "Missing required field: city" },
    });
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
