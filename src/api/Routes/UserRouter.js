const { Router } = require("express");
const UserController = require("../Controllers/UserController");
const ProfileEditRequest = require("../Requests/ProfileEditRequest");
const Auth = require("../Middlewares/Auth");

const userRouter = Router();

userRouter.patch("/edit", Auth, ProfileEditRequest, UserController.edit);

module.exports = userRouter;
