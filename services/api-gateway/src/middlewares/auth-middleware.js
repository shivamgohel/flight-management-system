const { StatusCodes } = require("http-status-codes");

const { tokenHelpers } = require("../utils/index");
const { ErrorResponse } = require("../utils/index");
const { logger } = require("../config/index");

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

    // Forward user info in headers to downstream services
    req.headers["x-user-id"] = decoded.id;
    req.headers["x-user-roles"] = decoded.roles.join(",");

    next();
  } catch (error) {
    logger.error("Authentication middleware error!");

    let message = "Invalid token!";
    if (error.name === "TokenExpiredError") message = "Token Expired!";
    else if (error.name === "JsonWebTokenError") message = "Invalid Token!";
    else message = "Authentication Error!";

    return res.status(StatusCodes.UNAUTHORIZED).json(
      ErrorResponse({
        message,
        error: error.message,
      })
    );
  }
}

function isAuthorized(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const rolesHeader = req.headers["x-user-roles"];
      if (!rolesHeader) {
        return res.status(StatusCodes.FORBIDDEN).json(
          ErrorResponse({
            message: "User roles not found",
          })
        );
      }

      const userRoles = rolesHeader
        .split(",")
        .map((r) => r.trim().toLowerCase());
      const hasAccess = allowedRoles.some((role) =>
        userRoles.includes(role.toLowerCase())
      );

      if (!hasAccess) {
        return res.status(StatusCodes.FORBIDDEN).json(
          ErrorResponse({
            message: "You don't have permission to access this resource",
          })
        );
      }

      next();
    } catch (error) {
      logger.error("Authorization middleware error!");
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        ErrorResponse({
          message: "Authorization check failed",
          error: error.message,
        })
      );
    }
  };
}

module.exports = {
  isAuthenticated,
  isAuthorized,
};
