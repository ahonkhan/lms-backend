const Request = require("../Middlewares/Request");
const { check } = require("express-validator");

const SendPasswordResetLinkRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("base_url").isString().withMessage("Base url is required"),

  Request.validator,
];

module.exports = SendPasswordResetLinkRequest;
