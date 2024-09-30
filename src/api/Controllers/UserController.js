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

      // Generate a 6-digit OTP
      const otpKey = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
      const signupOtp = new SignupOtp({ email: email, otpKey: otpKey });
      await signupOtp.save();

      res.status(200).json({ message: `OTP sent to ${email}`, otp: otpKey });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
}

module.exports = UserController;
