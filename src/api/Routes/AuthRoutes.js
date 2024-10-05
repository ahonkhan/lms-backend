const { Router } = require("express");
const AuthController = require("../Controllers/AuthController");
const sendSignupOtpRequest = require("../Requests/SendSignupOtpRequest");
const SignupRequest = require("../Requests/SignupRequest");
const loginRequest = require("../Requests/LoginRequest");
const Auth = require("../Middlewares/Auth");
const SendPasswordResetLinkRequest = require("../Requests/SendPasswordResetLinkRequest");
const PasswordResetRequest = require("../Requests/PasswordResetRequest");
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
userRouter.post(
  "/password-reset",
  PasswordResetRequest,
  AuthController.resetPassword
);

userRouter.get("/info", Auth, (req, res) => {
  return res
    .status(200)
    .json({ status: true, auth: true, user: req.user, role: req.user.role });
});
userRouter.post("/logout", Auth, AuthController.logout);

module.exports = userRouter;
