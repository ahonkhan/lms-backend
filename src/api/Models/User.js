const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  secondaryEmail: {
    type: String,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  gendar: {
    type: String,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = model("User", userSchema);
module.exports = User;
