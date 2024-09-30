const { Schema, model } = require("mongoose");

const signupOtpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  otpKey: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const SignupOtp = model("SignupOtp", signupOtpSchema);
module.exports = SignupOtp;
