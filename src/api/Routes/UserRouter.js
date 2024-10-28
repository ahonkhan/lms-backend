const { Router } = require("express");
const UserController = require("../Controllers/UserController");
const ProfileEditRequest = require("../Requests/ProfileEditRequest");
const Auth = require("../Middlewares/Auth");
const EnrollRequest = require("../Requests/enroll/EnrollRequest");
const EnrollController = require("../Controllers/EnrollController");
const VerifyPaymentRequest = require("../Requests/enroll/VerifyPaymentRequest");
const GetEnrolledCourseRequest = require("../Requests/enroll/GetEnrolledCourseRequest");
const CourseController = require("../Controllers/CourseController");
const ModuleLessonGetRequest = require("../Requests/module-lesson/ModuleLessonGetRequest");
const ModuleLessonController = require("../Controllers/ModuleLessonController");

const userRouter = Router();

userRouter.patch("/edit", Auth, ProfileEditRequest, UserController.edit);

userRouter.post("/enroll", Auth, EnrollRequest, EnrollController.enroll);
userRouter.post(
  "/enroll/verify/:token",
  Auth,
  VerifyPaymentRequest,
  EnrollController.verify
);

userRouter.get(
  "/course/:course",
  Auth,
  GetEnrolledCourseRequest,
  CourseController.getEnrolledCourse
);

userRouter.get("/user-details", Auth, UserController.getSingleUser);
userRouter.get(
  "/module-lesson",
  ModuleLessonGetRequest,
  ModuleLessonController.get
);
module.exports = userRouter;
