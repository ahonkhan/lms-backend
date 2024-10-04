const { check, validationResult } = require("express-validator");

const SendPasswordResetLinkRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("base_url").isString().withMessage("Base url is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = SendPasswordResetLinkRequest;
