const jwt = require("jsonwebtoken");
const { otpExpireTime } = require("../../config/config");
const Hash = require("../../utils/Hash");
const Mail = require("../Mail/Mail");
const SignupOtp = require("../Models/SignupOtp");
const User = require("../Models/User");

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

      const token = jwt.sign(userObj, process.env.jwt_secret, {
        expiresIn: 60 * 60 * 24 * 30,
      });

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
      const token = jwt.sign(userObj, process.env.jwt_secret, {
        expiresIn: "30d",
      });

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
}

module.exports = AuthController;
