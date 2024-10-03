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
    default: "",
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  gendar: {
    type: String,
    default: "male",
  },
  currentAddress: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: "",
  },
  role: {
    type: String,
    required: true,
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = model("User", userSchema);
module.exports = User;
