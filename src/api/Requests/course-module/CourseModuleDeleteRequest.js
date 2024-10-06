const { check } = require("express-validator");
const Request = require("../../Middlewares/Request");

const CourseModuleDeleteRequest = [
  check("moduleId")
    .notEmpty()
    .withMessage("Module ID is required")
    .isMongoId()
    .withMessage("Invalid module ID"),

  Request.validator,
];

module.exports = CourseModuleDeleteRequest;
