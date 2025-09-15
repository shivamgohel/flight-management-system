<<<<<<< HEAD
const { AuthRepository } = require("../repository/index");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/index");
=======
const { StatusCodes } = require("http-status-codes");

const { AuthRepository } = require("../repository/index");
const { AppError } = require("../utils/index");
const { logger } = require("../config/index");
>>>>>>> services/auth

const authRepository = new AuthRepository();

async function createUser(data) {
  try {
    const user = await authRepository.create(data);
    return user;
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const explanation = error.errors.map((err) => err.message);
      logger.warn("Validation failed during user creation:", explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    logger.error("Error occurred while creating user:", error);

    throw new AppError(
      "An unexpected error occurred while creating the user.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
};
