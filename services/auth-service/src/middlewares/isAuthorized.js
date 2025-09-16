const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/index");
const { logger } = require("../config/index");

function isAuthorized(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json(
          ErrorResponse({
            message: "Not authenticated",
          })
        );
      }

      const userRoles = user.roles || [];
      if (!Array.isArray(userRoles) || userRoles.length === 0) {
        return res.status(StatusCodes.FORBIDDEN).json(
          ErrorResponse({
            message: "User has no assigned roles",
          })
        );
      }

      const hasAccess = allowedRoles.some((allowed) =>
        userRoles.map((r) => r.toLowerCase()).includes(allowed.toLowerCase())
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

module.exports = isAuthorized;
