const { StatusCodes } = require("http-status-codes");

const { AuthRepository, RoleRepository } = require("../repository/index");
const { AppError } = require("../utils/index");
const { logger } = require("../config/index");
const { passwordHelpers, tokenHelpers } = require("../utils/index");
const { Enums } = require("./../utils/index");
const { ADMIN, FLIGHT_COMPANY, CUSTOMER } = Enums.USER_ROLES_ENUMS;

const authRepository = new AuthRepository();
const roleRepository = new RoleRepository();

async function createUser(data) {
  try {
    const user = await authRepository.create(data);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    // Ensure that role is defined, default to 'customer' if not
    let roleName = data.role ? data.role.toLowerCase() : "customer";

    let role;
    switch (roleName) {
      case ADMIN.toLowerCase():
        role = await roleRepository.getRoleByName(ADMIN);
        break;

      case FLIGHT_COMPANY.toLowerCase():
        role = await roleRepository.getRoleByName(FLIGHT_COMPANY);
        break;

      default:
        role = await roleRepository.getRoleByName(CUSTOMER);
    }

    if (role) {
      await user.addRole(role);
    }

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

    // 3. get roles assigned to the user
    const roles = await user.getRoles();
    const roleName = roles.map((role) => role.name);

    // 4. create JWT token payload and the token
    const payload = {
      id: user.id,
      email: user.email,
      roles: roleName,
    };
    const token = tokenHelpers.createToken(payload);

    // 5. remove the password from user object before returning
    const { password, ...userWithoutPassword } = user.toJSON();

    // 6. return the user info without password and the jwt token
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

async function addRoleToUser(id, data) {
  try {
    const user = await authRepository.get(id);
    if (!user) {
      throw new AppError(`User with id ${id} not found`, StatusCodes.NOT_FOUND);
    }

    const role = await roleRepository.getRoleByName(data.role);
    if (!role) {
      throw new AppError(`Role ${data.role} not found`, StatusCodes.NOT_FOUND);
    }

    // check if user already has role
    const userRoles = await user.getRoles();
    const userRoleNames = await userRoles.map((role) =>
      role.name.toLowerCase()
    );
    if (userRoleNames.includes(data.role.toLowerCase())) {
      return { success: false, message: "Role already assigned to user" };
    }

    // assign the role if not assigned
    await user.addRole(role);
    return { success: true, message: "Role assigned successfully" };
  } catch (error) {
    logger.error("Error in addRoleToUser", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "An unexpected error occured while adding role to user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
  signIn,
  addRoleToUser,
};
