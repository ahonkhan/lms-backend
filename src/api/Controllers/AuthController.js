const jwt = require("jsonwebtoken");
const { otpExpireTime } = require("../../config/config");
const Hash = require("../../utils/Hash");
const Mail = require("../Mail/Mail");
const SignupOtp = require("../Models/SignupOtp");
const User = require("../Models/User");
const Jwt = require("../../utils/Jwt");
const PasswordResetToken = require("../Models/PasswordResetToken");
const crypto = require("crypto");
class AuthController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static sendSignupOtpController = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(409).json({ message: "Email already exists." });
      }
      const oldOtp = await SignupOtp.findOne({ email: email });
      if (oldOtp) {
        await oldOtp.deleteOne();
      }

      const otpKey = Math.floor(100000 + Math.random() * 900000);
      const signupOtp = new SignupOtp({ email: email, otpKey: otpKey });
      await signupOtp.save();
      const signupOtpMail = new Mail();
      await signupOtpMail.send(email, {
        subject: "Email verification otp",
        html: `<h1>${otpKey}</h1>`,
      });

      return res.status(200).json({ message: `OTP sent to ${email}` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static signup = async (req, res) => {
    try {
      const { email, password, fullName, verificationCode } = req.body;
      const oldUser = await User.findOne({ email: email });
      if (oldUser) {
        return res.status(409).json({ message: "User already registered" });
      }
      const currentTime = Date.now();
      const expireTime = otpExpireTime * 1000;
      const signupOtp = await SignupOtp.findOne({
        email: email,
        otpKey: verificationCode,
      });

      if (!signupOtp) {
        return res.status(404).json({ message: "Invalid otp key" });
      }
      // check old user

      // checking otp expired time
      const otpCreatedTime = new Date(signupOtp.createdAt).getTime();
      if (currentTime - otpCreatedTime > expireTime) {
        return res.status(400).json({ message: "Otp expired" });
      }
      const hashedPassword = await Hash.make(password);
      const user = new User({
        fullName: fullName,
        email: email,
        password: hashedPassword,
      });

      await user.save();
      await signupOtp.deleteOne();
      let userObj = user.toObject();
      delete userObj.password;

      const token = Jwt.generateToken(userObj, req.browser, req.ip, req.os);

      return res.status(201).json({
        message: "Registration succesfull",
        status: true,
        user: userObj,
        access_token: token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email }).select("+password");
      if (!user) {
        return res.status(404).json({ message: "User is not registered" });
      }

      // check user password
      const compare = await Hash.check(password, user.password);
      if (!compare) {
        return res.status(409).json({ message: "Wrong password" });
      }
      let userObj = user.toObject();
      delete userObj.password;

      const token = Jwt.generateToken(userObj, req.browser, req.ip, req.os);

      return res.status(200).json({
        message: "Login succesfull",
        status: true,
        user: userObj,
        access_token: token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  static sendPasswordResetToken = async (req, res) => {
    try {
      const { email, base_url } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found." });
      }
      const oldToken = await PasswordResetToken.findOne({ email: email });
      if (oldToken) {
        await oldToken.deleteOne();
      }

      const token = crypto.randomBytes(16).toString("hex");
      const passwordResetToken = new PasswordResetToken({
        email: email,
        token: token,
      });
      await passwordResetToken.save();

      const resetMail = new Mail();
      await resetMail.send(email, {
        subject: "Password reset link",
        html: `<a href="${base_url + "/" + token}">Reset your password</a>`,
      });

      return res.status(200).json({
        message: `Password reset link sent to ${email}`,
        status: true,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  static resetPassword = async (req, res) => {
    try {
      const { token, newPassword, retypePassword } = req.body;
      if (newPassword !== retypePassword) {
        return res
          .status(409)
          .json({ status: false, message: "Password not matched" });
      }

      const oldToken = await PasswordResetToken.findOne({ token: token });
      if (!oldToken) {
        return res
          .status(404)
          .json({ status: false, message: "Password reset lnik invalid" });
      }
      const currentTime = Date.now();
      const expireTime = otpExpireTime * 1000;
      const tokenCreatedTime = new Date(oldToken.createdAt).getTime();
      if (currentTime - tokenCreatedTime > expireTime) {
        return res
          .status(409)
          .json({ status: false, message: "Password reset lnik expired" });
      }

      // everything is okay now try to reset password
      const user = await User.findOne({ email: oldToken.email }).select(
        "+password"
      );
      const hashedPassword = await Hash.make(newPassword);
      await user.updateOne({ password: hashedPassword });
      return res.status(200).json({
        status: true,
        message: "Password reset successfull",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };
}

module.exports = AuthController;
