const { Router } = require("express");
const UserController = require("../Controllers/UserController");
const sendSignupOtpRequest = require("../Requests/SendSignupOtpRequest");
const SignupRequest = require("../Requests/SignupRequest");

const userRouter = Router();

userRouter.post(
  "/signup-otp",
  sendSignupOtpRequest,
  UserController.sendSignupOtpController
);

userRouter.post("/signup", UserController.signup);

module.exports = userRouter;
