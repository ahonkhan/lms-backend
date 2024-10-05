const Admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      status: false,
      message: "You have no permission to perform this operation.",
    });
  }
  next();
};

module.exports = Admin;
