const { Router } = require("express");
const CategoryController = require("../Controllers/CategoryController");
const CategoryCreateRequest = require("../Requests/CategoryCreateRequest");
const CategoryUpdateRequest = require("../Requests/CategoryUpdateRequest");
const CourseController = require("../Controllers/CourseController");
const CourseCreateRequest = require("../Requests/CourseCreateRequest");
const uploadFile = require("../../config/upload");
const CourseUpdateRequest = require("../Requests/CourseUpdateRequest");
const Course = require("../Models/Course");
const CourseModuleCreateRequest = require("../Requests/course-module/CourseModuleCreateRequest");
const CourseModuleController = require("../Controllers/CourseModuleController");
const CourseModuleGetRequest = require("../Requests/course-module/CourseModuleGetRequest");
const CourseModuleUpdateRequest = require("../Requests/course-module/CourseModuleUpdateRequest");
const CourseModuleDeleteRequest = require("../Requests/course-module/CourseModuleDeleteRequest");
const ModuleLessonCreateRequest = require("../Requests/module-lesson/ModuleLessonCreateRequest");
const ModuleLessonController = require("../Controllers/ModuleLessonController");
const ModuleLessonUpdateRequest = require("../Requests/module-lesson/ModuleLessonUpdateRequest");
const ModuleLessonGetRequest = require("../Requests/module-lesson/ModuleLessonGetRequest");
const ModuleLessonDeleteRequest = require("../Requests/module-lesson/ModuleLessonDeleteRequest");
const adminRouter = Router();
adminRouter.get("/category", CategoryController.getCategoryWithCourseCount);
adminRouter.post("/category", CategoryCreateRequest, CategoryController.create);
adminRouter.patch(
  "/category/:id",
  CategoryUpdateRequest,
  CategoryController.update
);

adminRouter.delete("/category/:id", CategoryController.delete);

// courses routes

adminRouter.post(
  "/course",
  uploadFile("previewImage", [".png", ".jpg", ".webp"]),
  CourseCreateRequest,
  CourseController.create
);
adminRouter.get("/course", async (req, res) => {
  const courses = await Course.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return res.status(200).json({ status: true, courses: courses });
});




adminRouter.patch(
  "/course/:courseId",
  uploadFile("previewImage", [".png", ".jpg", ".webp"]),
  CourseUpdateRequest,
  CourseController.update
);
adminRouter.delete("/course/:courseId", CourseController.delete);

// Course module routes

adminRouter.post(
  "/course-module",
  CourseModuleCreateRequest,
  CourseModuleController.create
);
adminRouter.get(
  "/course-module",
  CourseModuleGetRequest,
  CourseModuleController.get
);
adminRouter.patch(
  "/course-module/:moduleId",
  CourseModuleUpdateRequest,
  CourseModuleController.update
);
adminRouter.delete(
  "/course-module/:moduleId",
  CourseModuleDeleteRequest,
  CourseModuleController.delete
);

// module lessons
adminRouter.post(
  "/module-lesson",
  ModuleLessonCreateRequest,
  ModuleLessonController.create
);
adminRouter.patch(
  "/module-lesson/:lessonId",
  ModuleLessonUpdateRequest,
  ModuleLessonController.update
);
adminRouter.delete(
  "/module-lesson/:lessonId",
  ModuleLessonDeleteRequest,
  ModuleLessonController.delete
);
adminRouter.get(
  "/module-lesson",
  ModuleLessonGetRequest,
  ModuleLessonController.get
);

module.exports = adminRouter;
