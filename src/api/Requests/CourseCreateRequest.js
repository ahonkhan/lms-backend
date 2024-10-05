const { check } = require("express-validator");
const Request = require("../Middlewares/Request");

const CourseCreateRequest = [
  check("name")
    .isString()
    .withMessage("Course name is required")
    .notEmpty()
    .withMessage("Course name cannot be empty"),

  check("description")
    .isString()
    .withMessage("Description is required")
    .notEmpty()
    .withMessage("Description cannot be empty"),

  check("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => {
      if (value < 0) {
        throw new Error("Price must be a positive number");
      }
      return true;
    }),

  check("category")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  check("batch").isNumeric().withMessage("Batch information is required"),

  check("previewVideo")
    .optional()
    .isString()
    .withMessage("Preview video must be a valid URL"),

  check("startDate")
    .exists()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage(
      "Start date must be a valid date format (YYYY-MM-DD or ISO 8601 format)"
    ),

  Request.validator,
];

module.exports = CourseCreateRequest;
