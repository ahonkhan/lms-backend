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
const GetSingleModuleLessonRequest = require("../Requests/GetSingleModuleLessonRequest");
const CourseModuleGetRequest = require("../Requests/course-module/CourseModuleGetRequest");
const CourseModuleController = require("../Controllers/CourseModuleController");
const uploadFile = require("../../config/uploadFile");

const userRouter = Router();

userRouter.put(
  "/edit",
  Auth,
  uploadFile("profilePicture", [".png", ".jpg", ".webp", ".jpeg"]),
  ProfileEditRequest,
  UserController.edit
);

userRouter.post("/enroll", Auth, EnrollRequest, EnrollController.enroll);
userRouter.get(
  "/enroll/verify/:token",
  Auth,
  VerifyPaymentRequest,
  EnrollController.verify
);

userRouter.get("/my-courses", Auth, CourseController.myEnrolledCourse);

userRouter.get(
  "/course/:course",
  Auth,
  GetEnrolledCourseRequest,
  CourseController.getEnrolledCourse
);

userRouter.get("/user-details", Auth, UserController.getSingleUser);
userRouter.get(
  "/module-lesson/:lessonID",
  Auth,
  GetSingleModuleLessonRequest,
  ModuleLessonController.getSingleModuleLesson
);

userRouter.get(
  "/get-all-module-lesson/:module",
  Auth,
  ModuleLessonGetRequest,
  ModuleLessonController.get
);
userRouter.get(
  "/get-all-course-module/:course",
  Auth,
  CourseModuleGetRequest,
  CourseModuleController.get
);
module.exports = userRouter;
