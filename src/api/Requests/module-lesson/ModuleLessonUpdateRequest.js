const Request = require("../../Middlewares/Request");
const { check } = require("express-validator");

const ModuleLessonUpdateRequest = [
  check("name").isString().withMessage("Lesson name is required").optional(),
  check("description")
    .isString()
    .withMessage("Lesson description is required")
    .optional(),
  check("lessonId").isMongoId().withMessage("Valid lesson id is required"),
  check("video").isURL().withMessage("Video url is required").optional(),

  Request.validator,
];

module.exports = ModuleLessonUpdateRequest;
