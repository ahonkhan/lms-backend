const { check, validationResult } = require("express-validator");

const sendSignupOtpRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
];

module.exports = sendSignupOtpRequest;
