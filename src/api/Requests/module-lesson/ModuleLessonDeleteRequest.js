const Request = require("../../Middlewares/Request");
const { check } = require("express-validator");

const ModuleLessonDeleteRequest = [
  check("lessonId").isMongoId().withMessage("Valid lesson id is required"),

  Request.validator,
];

module.exports = ModuleLessonDeleteRequest;
