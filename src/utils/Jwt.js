const jwt = require("jsonwebtoken");
class Jwt {
  static dynamicSecret = (browser, ip, os) => {
    const secretKey = process.env.JWT_SECRET;
    let dynamicSecret = secretKey;
    if (browser) {
      dynamicSecret += browser;
    }
    if (ip) {
      dynamicSecret += ip;
    }
    if (os) {
      dynamicSecret += os;
    }

    return dynamicSecret;
  };
  static generateToken = (user, browser, ip, os) => {
    const token = jwt.sign(user, this.dynamicSecret(browser, ip, os), {
      expiresIn: "30d",
    });

    return token;
  };
}

module.exports = Jwt;
