const { StatusCodes } = require("http-status-codes");

const { AuthRepository, RoleRepository } = require("../repository/index");
const { AppError } = require("../utils/index");
const { logger } = require("../config/index");
const { passwordHelpers, tokenHelpers } = require("../utils/index");
const { Enums } = require("./../utils/index");

const authRepository = new AuthRepository();
const roleRepository = new RoleRepository();

async function createUser(data) {
  try {
    const user = await authRepository.create(data);
    const role = await roleRepository.getRoleByName(
      Enums.USER_ROLES_ENUMS.CUSTOMER
    );

    await user.addRole(role);

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

async function signIn(data) {
  try {
    // 1. find user by email
    const user = await authRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new AppError(
        `No user found for ${data.email}`,
        StatusCodes.NOT_FOUND
      );
    }

    // 2. verify the password
    const isPasswordValid = await passwordHelpers.comparePassword(
      data.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid Password", StatusCodes.UNAUTHORIZED);
    }

    // 3. create JWT token payload and the token
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = tokenHelpers.createToken(payload);

    // 4. remove the password from user object before returning
    const { password, ...userWithoutPassword } = user.toJSON();

    // 5. return the user info without password and the jwt token
    return {
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    logger.error("Error during signIn:", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "An unexpected error occured during signIn",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
  signIn,
};
