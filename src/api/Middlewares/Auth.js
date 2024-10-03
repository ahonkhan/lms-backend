const jwt = require("jsonwebtoken");
const Jwt = require("../../utils/Jwt");

const Auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token missing", status: false });
  }
  jwt.verify(
    token,
    Jwt.dynamicSecret(req.browser, req.ip, req.os),
    (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid or expired token", status: false });
      }
      req.user = user;
      req.token = token;
      next();
    }
  );
};

module.exports = Auth;
