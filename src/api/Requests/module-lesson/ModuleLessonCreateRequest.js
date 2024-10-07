
const { check } = require("express-validator");
const Request = require("../../Middlewares/Request");

const ModuleLessonCreateRequest = [
  check("name").isString().withMessage("Lesson name is required"),
  check("description").isString().withMessage("Lesson description is required"),
  check("module")
    .notEmpty()
    .withMessage("Module id is required")
    .isMongoId()
    .withMessage("Valid module id is required"),
  check("video").isURL().withMessage("Video url is required"),

  Request.validator,
];

module.exports = ModuleLessonCreateRequest;
