const jwt = require("jsonwebtoken");
const Jwt = require("../../utils/Jwt");
const BlacklistToken = require("../Models/BlacklistToken");
const User = require("../Models/User");

const Auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token missing", status: false });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(403).json({ message: "Unauthorized", status: false });
  }

  jwt.verify(
    token,
    Jwt.dynamicSecret(req.browser, req.ip, req.os),
    async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Unauthorized", status: false });
      }

      const checkUser = await User.findById(user._id);
      if (!checkUser) {
        return res.status(403).json({ message: "Unauthorized", status: false });
      }
      req.user = checkUser;
      req.token = token;
      next();
    }
  );
};

module.exports = Auth;
