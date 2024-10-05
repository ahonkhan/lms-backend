const { Router } = require("express");
const AuthController = require("../Controllers/AuthController");
const sendSignupOtpRequest = require("../Requests/SendSignupOtpRequest");
const SignupRequest = require("../Requests/SignupRequest");
const loginRequest = require("../Requests/LoginRequest");
const Auth = require("../Middlewares/Auth");
const SendPasswordResetLinkRequest = require("../Requests/SendPasswordResetLinkRequest");
const PasswordResetRequest = require("../Requests/PasswordResetRequest");
// const upload = require("../Services/multer");

const authRouter = Router();

authRouter.post(
  "/signup-otp",
  sendSignupOtpRequest,
  AuthController.sendSignupOtpController
);

authRouter.post("/signup", SignupRequest, AuthController.signup);
authRouter.post("/login", loginRequest, AuthController.login);
authRouter.post(
  "/password-reset-link",
  SendPasswordResetLinkRequest,
  AuthController.sendPasswordResetToken
);
authRouter.post(
  "/password-reset",
  PasswordResetRequest,
  AuthController.resetPassword
);

authRouter.get("/info", Auth, (req, res) => {
  return res
    .status(200)
    .json({ status: true, auth: true, user: req.user, role: req.user.role });
});

authRouter.post("/logout", Auth, AuthController.logout);

module.exports = authRouter;
