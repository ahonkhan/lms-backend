const Request = require("../Middlewares/Request");
const { check } = require("express-validator");

const sendSignupOtpRequest = [
  check("email").isEmail().withMessage("Valid email is required"),

  Request.validator,
];

module.exports = sendSignupOtpRequest;
