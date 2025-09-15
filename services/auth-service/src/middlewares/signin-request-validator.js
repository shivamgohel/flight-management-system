const { validationResult, body } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/index");

const validateSignin = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        ErrorResponse({
          message: "Validation Error",
          error: errors.array(),
        })
      );
    }

    next();
  },
];

module.exports = validateSignin;
