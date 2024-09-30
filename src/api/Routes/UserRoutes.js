const { Router } = require("express");
const UserController = require("../Controllers/UserController");
const sendSignupOtpRequest = require("../Requests/SendSignupOtpRequest");
const SignupRequest = require("../Requests/SignupRequest");
const upload = require("../Services/multer");

const userRouter = Router();

userRouter.post(
  "/signup-otp",
  upload.none(),
  sendSignupOtpRequest,
  UserController.sendSignupOtpController
);

userRouter.post("/signup", upload.none(), SignupRequest, UserController.signup);

module.exports = userRouter;
