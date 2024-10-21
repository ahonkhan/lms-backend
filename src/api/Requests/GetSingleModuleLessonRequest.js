const { check, body } = require("express-validator");
const Request = require("../Middlewares/Request");

const GetSingleModuleLessonRequest = [
  check("lessonID").isMongoId().withMessage("Invalid lesson ID"),

  Request.validator,
];

module.exports = GetSingleModuleLessonRequest;
