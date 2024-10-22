const { check } = require("express-validator");
const Request = require("../Middlewares/Request");

const SignupRequest = [
  check("fullName").notEmpty().withMessage("Full name is required").isString(),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").notEmpty().withMessage("Password is required").isString(),
  check("verificationCode")
    .isNumeric()
    .withMessage("email verification code is required"),

  Request.validator,
];

module.exports = SignupRequest;
