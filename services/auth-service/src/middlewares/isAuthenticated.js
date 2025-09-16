const { StatusCodes } = require("http-status-codes");

const { tokenHelpers } = require("../utils/index");
const { ErrorResponse } = require("../utils/index");
const { logger } = require("../config/index");

/**
 * Middleware to check if the request has a valid JWT token.
 * Attaches decoded user info to req.user if valid.
 */
function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json(
      ErrorResponse({
        message: "Authorization token missing or malformed",
      })
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = tokenHelpers.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Authentication middleware error!");

    let message = "Invalid token!";

    if (error.name === "TokenExpiredError") {
      message = "Token Expired!";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid Token!";
    } else {
      message = "Authentication Error!";
    }

    return res.status(StatusCodes.UNAUTHORIZED).json(
      ErrorResponse({
        message,
        error: error.message,
      })
    );
  }
}

module.exports = isAuthenticated;
