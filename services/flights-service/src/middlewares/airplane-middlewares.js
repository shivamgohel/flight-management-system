const { StatusCodes } = require("http-status-codes");

function validateCreateRequest(req, res, next) {
  if (!req.body.airplane) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Airplane was not found in the incoming request",
      error: { details: "Missing required field: airplane" },
    });
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
