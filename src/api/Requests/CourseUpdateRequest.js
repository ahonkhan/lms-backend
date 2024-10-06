const { check, body } = require("express-validator");
const Request = require("../Middlewares/Request");

const CourseUpdateRequest = [
  check("name").isString().withMessage("Course name is required").optional(),
  check("description")
    .isString()
    .withMessage("Description is required")
    .optional(),
  check("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .optional()
    .custom((value) => {
      if (value < 0) {
        throw new Error("Price must be a positive number");
      }
      return true;
    }),

  check("category").isMongoId().withMessage("Invalid category ID").optional(),
  check("courseId").isMongoId().withMessage("Invalid course ID"),

  check("batch")
    .isNumeric()
    .withMessage("Batch information is required")
    .optional(),

  check("previewVideo")
    .optional()
    .isString()
    .withMessage("Preview video must be a valid URL"),

  check("status").optional().isString(),
  check("startDate")
    .exists()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage(
      "Start date must be a valid date format (YYYY-MM-DD or ISO 8601 format)"
    )
    .optional(),

  Request.validator,
];

module.exports = CourseUpdateRequest;
