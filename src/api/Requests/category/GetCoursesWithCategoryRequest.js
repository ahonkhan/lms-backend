const Request = require("../../Middlewares/Request");
const { check } = require("express-validator");

const GetCoursesWithCategoryRequest = [
  check("category").isMongoId().withMessage("Valid category id is required"),

  Request.validator,
];

module.exports = GetCoursesWithCategoryRequest;
