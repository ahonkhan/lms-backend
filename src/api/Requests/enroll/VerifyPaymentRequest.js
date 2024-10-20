const Request = require("../../Middlewares/Request");
const { check } = require("express-validator");

const VerifyPaymentRequest = [
  check("token")
    .notEmpty()
    .withMessage("Transaction token is required.")
    .isMongoId()
    .withMessage("Valid id is required"),

  Request.validator,
];

module.exports = VerifyPaymentRequest;
