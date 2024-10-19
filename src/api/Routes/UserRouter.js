const { Router } = require("express");
const UserController = require("../Controllers/UserController");
const ProfileEditRequest = require("../Requests/ProfileEditRequest");
const Auth = require("../Middlewares/Auth");
const EnrollRequest = require("../Requests/enroll/EnrollRequest");
const EnrollController = require("../Controllers/EnrollController");

const userRouter = Router();

userRouter.patch("/edit", Auth, ProfileEditRequest, UserController.edit);

// enroll course
userRouter.post("/enroll", Auth, EnrollRequest, EnrollController.enroll);
userRouter.post("/enroll/verify/:token", Auth, EnrollController.verify);
module.exports = userRouter;
