const { check } = require("express-validator");
const Request = require("../../Middlewares/Request");

const CourseModuleUpdateRequest = [
  check("name")
    .isString()
    .withMessage("Course name is required")
    .notEmpty()
    .withMessage("Course name cannot be empty")
    .optional(),

  check("description")
    .isString()
    .withMessage("Description is required")
    .notEmpty()
    .withMessage("Description cannot be empty")
    .optional(),
  check("status")
    .isString()
    .withMessage("Description is required")
    .notEmpty()
    .withMessage("status cannot be empty")
    .optional(),

  check("startDate")
    .isISO8601()
    .withMessage(
      "Start date must be a valid date format (YYYY-MM-DD or ISO 8601 format)"
    )
    .optional(),

  check("endDate")
    .isISO8601()
    .withMessage(
      "End date must be a valid date format (YYYY-MM-DD or ISO 8601 format)"
    )
    .optional(),

  Request.validator,
];

module.exports = CourseModuleUpdateRequest;
