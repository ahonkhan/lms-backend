const User = require("../Models/User");

class UserController {
  static edit = async (req, res) => {
    const {
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      currentAddress,
      secondaryEmail,
    } = req.body;
    try {
      const user = await User.findById(req.user.id);
      if (fullName) {
        user.fullName = fullName;
      }
      if (gender) {
        user.gender = gender;
      }
      if (dateOfBirth) {
        user.dateOfBirth = dateOfBirth;
      }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (currentAddress) {
        user.currentAddress = currentAddress;
      }
      if (secondaryEmail) {
        user.secondaryEmail = secondaryEmail;
      }

      await user.save();
      return res.status(200).json({
        status: true,
        message: "Updated successfully",
        updatedUser: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  };

  static getSingleUser = async (req, res) => {
    return res.status(200).json({ status: true, user: req.user });
  };
}

module.exports = UserController;
