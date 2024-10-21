const { check, body } = require("express-validator");
const Request = require("../Middlewares/Request");

const GetSingleCourseRequest = [
  check("courseID").isMongoId().withMessage("Invalid course ID"),

  Request.validator,
];

module.exports = GetSingleCourseRequest;
