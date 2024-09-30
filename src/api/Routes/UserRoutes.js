const { Router } = require("express");
const UserController = require("../Controllers/UserController");

const userRouter = Router();

userRouter.get("/signup-otp", UserController.sendSignupOtpController);

module.exports = userRouter;
