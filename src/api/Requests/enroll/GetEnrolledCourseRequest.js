const Request = require("../../Middlewares/Request");
const { check } = require("express-validator");

const GetEnrolledCourseRequest = [
  check("course")
    .notEmpty()
    .withMessage("Course id is required.")
    .isMongoId()
    .withMessage("Valid id is required"),

  Request.validator,
];

module.exports = GetEnrolledCourseRequest;
