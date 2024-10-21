const { check, body } = require("express-validator");
const Request = require("../Middlewares/Request");

const GetSingleCategoryRequest = [
  check("categoryID").isMongoId().withMessage("Invalid category ID"),

  Request.validator,
];

module.exports = GetSingleCategoryRequest;
