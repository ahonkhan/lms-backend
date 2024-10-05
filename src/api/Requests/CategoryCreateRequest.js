const Request = require("../Middlewares/Request");
const { check } = require("express-validator");

const CategoryCreateRequest = [
  check("name").isString().withMessage("Category name is required"),

  Request.validator,
];

module.exports = CategoryCreateRequest;
