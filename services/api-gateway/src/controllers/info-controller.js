const { StatusCodes } = require("http-status-codes");
const SuccessResponse = require("../utils/common/success-response");

const info = (req, res) => {
  return res
    .status(StatusCodes.OK)
    .json(SuccessResponse({ message: "API is live." }));
};

module.exports = {
  info,
};
