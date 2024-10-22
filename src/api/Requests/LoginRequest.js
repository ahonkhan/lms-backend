const Request = require("../Middlewares/Request");
const { check } = require("express-validator");

const loginRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").notEmpty().withMessage("Password is required").isString(),

  Request.validator,
];

module.exports = loginRequest;
