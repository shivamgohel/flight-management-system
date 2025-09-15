const { StatusCodes } = require("http-status-codes");

const { AuthService } = require("../services/index");
const { ErrorResponse, SuccessResponse, AppError } = require("../utils/index");
const { logger } = require("../config/index");

/**
 * POST /auth/signup
 *
 * Expected request body (JSON):
 * {
 *   "email": "user@example.com",      // string, required, valid email
 *   "password": "yourPassword123"     // string, required, min length 3, max length 50
 * }
 */
async function signup(req, res) {
  try {
    const { email, password } = req.body;
    const user = await AuthService.createUser({ email, password });

    return res.status(StatusCodes.CREATED).json(
      SuccessResponse({
        message: "User created successfully",
        data: user,
      })
    );
  } catch (error) {
    logger.error("User creation failed at controller layer", {
      error: error.message,
    });

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        ErrorResponse({
          message: "Invalid input data",
        })
      );
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorResponse({
        message: "Something went wrong while creating the user",
        error: error.message,
      })
    );
  }
}

/**
 * POST /auth/signin
 *
 * Expected request body (JSON):
 * {
 *   "email": "user@example.com",      // string, required, valid email
 *   "password": "yourPassword123"     // string, required
 * }
 */
async function signin(req, res) {
  try {
    const { email, password } = req.body;

    const { user, token } = await AuthService.signIn({ email, password });

    return res.status(StatusCodes.OK).json(
      SuccessResponse({
        message: "User signed in successfully",
        data: { user, token },
      })
    );
  } catch (error) {
    logger.error("User sign-in failed at controller layer", {
      error: error.message,
    });

    if (error instanceof AppError) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        ErrorResponse({
          message: error.message,
        })
      );
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorResponse({
        message: "Something went wrong while sign-in the user",
        error: error.message,
      })
    );
  }
}

module.exports = {
  signup,
  signin,
};
