const { Router } = require("express");
const UserController = require("../Controllers/UserController");
const sendSignupOtpRequest = require("../Requests/SendSignupOtpRequest");

const userRouter = Router();

userRouter.post(
  "/signup-otp",
  sendSignupOtpRequest,
  UserController.sendSignupOtpController
);

module.exports = userRouter;
