const { check } = require("express-validator");
const Request = require("../Middlewares/Request");

const ProfileEditRequest = [
  check("fullName").isString().optional(),
  check("gender").isString().optional().isIn(["male", "female", "others"]),
  check("secondaryEmail").isEmail().optional(),
  check("currentAddress").isString().optional(),
  check("phoneNumber").isString().optional(),
  check("dateOfBirth").isDate().optional(),

  Request.validator,
];

module.exports = ProfileEditRequest;
