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

/**
 * POST /auth/users/:id/roles
 *
 * Expected request params:
 *   id - User ID (in URL path)
 *
 * Expected request body (JSON):
 * {
 *   "role": "customer"    // string, required, role name to assign to user
 * }
 *
 */
async function addRoleToUser(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const result = await AuthService.addRoleToUser(id, { role });

    // If the service says role is already assigned, return 409 Conflict or 400 Bad Request
    if (result.success === false) {
      return res.status(StatusCodes.CONFLICT).json(
        ErrorResponse({
          message: result.message,
        })
      );
    }

    // Otherwise, role assigned successfully
    return res.status(StatusCodes.OK).json(
      SuccessResponse({
        message: `Role ${role} added to user with id:${id} successfully`,
        data: result,
      })
    );
  } catch (error) {
    logger.error("Add role to user failed at controller layer", {
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
        message: "Something went wrong with adding role to user",
        error: error.message,
      })
    );
  }
}

/**
 * GET /auth/users/:id
 *
 * Fetch a user by their ID.
 *
 * Path Parameters:
 *   id (string) - The unique identifier of the user to retrieve.
 */
async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await AuthService.getUser(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json(
        ErrorResponse({
          message: `User with id ${id} not found`,
        })
      );
    }

    const userData = typeof user.toJSON === "function" ? user.toJSON() : user;
    const { password, ...userWithoutPassword } = userData;

    return res.status(StatusCodes.OK).json(
      SuccessResponse({
        message: "User fetched successfully",
        data: userWithoutPassword,
      })
    );
  } catch (error) {
    logger.error("Error fetching user at controller layer", {
      error: error.message,
    });

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorResponse({
        message: "Something went wrong while fetching the user",
        error: error.message,
      })
    );
  }
}

module.exports = {
  signup,
  signin,
  addRoleToUser,
  getUser,
};
