const { check, body } = require("express-validator");
const Request = require("../Middlewares/Request");

const GetSingleCourseModuleRequest = [
  check("moduleID").isMongoId().withMessage("Invalid course module ID"),

  Request.validator,
];

module.exports = GetSingleCourseModuleRequest;
