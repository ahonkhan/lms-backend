const { Router } = require("express");
const UserController = require("../Controllers/UserController");
const sendSignupOtpRequest = require("../Requests/SendSignupOtpRequest");
const SignupRequest = require("../Requests/SignupRequest");
const loginRequest = require("../Requests/LoginRequest");
// const upload = require("../Services/multer");

const userRouter = Router();

userRouter.post(
  "/signup-otp",
  sendSignupOtpRequest,
  UserController.sendSignupOtpController
);

userRouter.post("/signup", SignupRequest, UserController.signup);
userRouter.post("/login", loginRequest, UserController.login);

module.exports = userRouter;
