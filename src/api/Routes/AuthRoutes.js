const { Router } = require("express");
const AuthController = require("../Controllers/AuthController");
const sendSignupOtpRequest = require("../Requests/SendSignupOtpRequest");
const SignupRequest = require("../Requests/SignupRequest");
const loginRequest = require("../Requests/LoginRequest");
const Auth = require("../Middlewares/Auth");
const SendPasswordResetLinkRequest = require("../Requests/SendPasswordResetLinkRequest");
// const upload = require("../Services/multer");

const userRouter = Router();

userRouter.post(
  "/signup-otp",
  sendSignupOtpRequest,
  AuthController.sendSignupOtpController
);

userRouter.post("/signup", SignupRequest, AuthController.signup);
userRouter.post("/login", loginRequest, AuthController.login);
userRouter.post(
  "/password-reset-link",
  SendPasswordResetLinkRequest,
  AuthController.sendPasswordResetToken
);
userRouter.get("/user", Auth, (req, res) => {
  res.send(req.user);
});
module.exports = userRouter;
