const { validationResult } = require("express-validator");

class Request {
  static validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }
    next();
  };
}

module.exports = Request;
