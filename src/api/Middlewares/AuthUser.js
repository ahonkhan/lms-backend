const jwt = require("jsonwebtoken");
const Jwt = require("../../utils/Jwt");
const User = require("../Models/User");

const AuthUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(
    token,
    Jwt.dynamicSecret(req.browser, req.ip, req.os),
    async (err, user) => {
      if (user) {
        const checkUser = await User.findById(user._id);
        if (checkUser) {
          req.user = checkUser;
          req.token = token;
        }
      }
      next();
    }
  );
};

module.exports = AuthUser;
