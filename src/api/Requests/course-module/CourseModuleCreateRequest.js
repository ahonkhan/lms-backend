const { check } = require("express-validator");
const Request = require("../../Middlewares/Request");

const CourseModuleCreateRequest = [
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

  check("course")
    .notEmpty()
    .withMessage("course ID is required")
    .isMongoId()
    .withMessage("Invalid course ID"),

  check("moduleId").isMongoId().withMessage("Invalid module ID"),

  check("startDate")
    .exists()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage(
      "Start date must be a valid date format (YYYY-MM-DD or ISO 8601 format)"
    ),

  check("endDate")
    .exists()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage(
      "End date must be a valid date format (YYYY-MM-DD or ISO 8601 format)"
    ),

  Request.validator,
];

module.exports = CourseModuleCreateRequest;
