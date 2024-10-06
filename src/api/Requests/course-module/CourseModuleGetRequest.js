const { check } = require("express-validator");
const Request = require("../../Middlewares/Request");

const CourseModuleGetRequest = [
  check("course")
    .notEmpty()
    .withMessage("course ID is required")
    .isMongoId()
    .withMessage("Invalid course ID"),

  Request.validator,
];

module.exports = CourseModuleGetRequest;
