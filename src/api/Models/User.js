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
  profilePicture: {
    type: String,
    default: null,
  },
  publicId: {
    type: String,
    default: null,
  },
  gender: {
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
    type: String,
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
