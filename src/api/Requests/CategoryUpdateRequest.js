const Request = require("../Middlewares/Request");
const { check } = require("express-validator");

const CategoryUpdateRequest = [
  check("name").isString().optional(),

  Request.validator,
];

module.exports = CategoryUpdateRequest;
