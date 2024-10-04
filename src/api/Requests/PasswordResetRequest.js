const Request = require("../Middlewares/Request");
const { check } = require("express-validator");

const PasswordResetRequest = [
  check("token").isString().withMessage("Token is required."),
  check("newPassword").isString().withMessage("newPassword is required."),
  check("retypePassword").isString().withMessage("retypePassword is required."),

  Request.validator,
];

module.exports = PasswordResetRequest;
