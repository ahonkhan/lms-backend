const UAParser = require("ua-parser-js");
const parser = new UAParser();

const userAgent = (req, res, next) => {
  const userAgent = req.headers["user-agent"];
  const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Parse user-agent
  const ua = parser.setUA(userAgent).getResult();

  const browserName = ua.browser.name; // Browser name
  const osName = ua.os.name; // Operating System name
  req.browser = browserName;
  req.os = osName;
  req.ip = userIp;

  next();
};

module.exports = userAgent;
