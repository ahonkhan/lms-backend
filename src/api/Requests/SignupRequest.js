const { check, validationResult } = require("express-validator");

const SignupRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("fullName").isString().withMessage("Full name is required"),
  check("password").isString().withMessage("Password is required"),
  check("verificationCode")
    .isNumeric()
    .withMessage("Verification code email is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = SignupRequest;
