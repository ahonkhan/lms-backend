const Request = require("../../Middlewares/Request");
const { check } = require("express-validator");

const ModuleLessonGetRequest = [
  check("module").isMongoId().withMessage("Valid lesson id is required"),

  Request.validator,
];

module.exports = ModuleLessonGetRequest;
