const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const allowedStatues = ["BOOKED", "CANCELLED", "INITIATED", "PENDING"];

function validateStatusUpdate(req, res, next) {
  let { status } = req.body;

  if (!status) {
    return next(new AppError("Status is required", StatusCodes.BAD_REQUEST));
  }

  status = status.toUpperCase();

  if (!allowedStatues.includes(status)) {
    return next(
      new AppError(
        `Invalid status value. Allowed values: ${allowedStatues.join(",")}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }

  req.body.status = status;

  next();
}

module.exports = validateStatusUpdate;
