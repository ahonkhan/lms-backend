const { check, body } = require("express-validator");
const Request = require("../Middlewares/Request");

const CourseDetailsGetRequest = [
  check("courseId").isMongoId().withMessage("Invalid course ID"),
  Request.validator,
];

module.exports = CourseDetailsGetRequest;
