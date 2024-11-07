const Request = require("../Middlewares/Request");
const { check } = require("express-validator");

const PasswordResetRequest = [
  check("token")
    .notEmpty()
    .withMessage("Token is required.")
    .isString()
    .withMessage("Must be string"),
  check("newPassword")
    .notEmpty()
    .withMessage("newPassword is required.")
    .isString()
    .withMessage("Must be string"),
  check("retypePassword")
    .notEmpty()
    .withMessage("retypePassword is required.")
    .isString()
    .withMessage("Must be string"),

  Request.validator,
];

module.exports = PasswordResetRequest;
