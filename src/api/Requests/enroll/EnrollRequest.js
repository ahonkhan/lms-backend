const Request = require("../../Middlewares/Request");
const { check } = require("express-validator");

const EnrollRequest = [
  check("course")
    .notEmpty()
    .withMessage("Course id is required.")
    .isMongoId()
    .withMessage("Valid id is required"),
  check("paymentMethod")
    .isString()
    .withMessage("Payment method is required")
    .isIn(["bkash", "nagad", "rocket", "card"]),
  check("successUrl").isString().withMessage("Success url is required"),
  check("cancelUrl").isString().withMessage("Cancel url is required"),

  Request.validator,
];

module.exports = EnrollRequest;
