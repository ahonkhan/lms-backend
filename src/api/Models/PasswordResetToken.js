const { Schema, model } = require("mongoose");

const passwordResetTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const PasswordResetToken = model(
  "PasswordResetToken",
  passwordResetTokenSchema
);
module.exports = PasswordResetToken;
