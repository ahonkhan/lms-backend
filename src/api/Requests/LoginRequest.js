const { check, validationResult } = require("express-validator");

const loginRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").isString().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = loginRequest;
