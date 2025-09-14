const { validationResult, body } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/index");

const validateSignup = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Password must be between 3 and 50 characters"),

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

module.exports = validateSignup;
