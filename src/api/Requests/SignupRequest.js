const { check } = require("express-validator");
const Request = require("../Middlewares/Request");

const SignupRequest = [
  check("fullName").isString().withMessage("Full name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").isString().withMessage("Password is required"),
  check("verificationCode")
    .isNumeric()
    .withMessage("email verification code is required"),

  Request.validator,
];

module.exports = SignupRequest;
