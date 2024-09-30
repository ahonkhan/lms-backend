const Mail = require("../Mail/Mail");
const SignupOtp = require("../Models/SignupOtp");
const User = require("../Models/User");

class UserController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static sendSignupOtpController = async (req, res) => {
    const { email } = req.body;
    try {
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
      signupOtpMail.send(email, {
        subject: "Email verification otp",
        html: `<h1>${otpKey}</h1>`,
      });

      res.status(200).json({ message: `OTP sent to ${email}` });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
}

module.exports = UserController;
