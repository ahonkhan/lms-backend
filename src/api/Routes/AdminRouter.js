const { Router } = require("express");
const CategoryController = require("../Controllers/CategoryController");
const CategoryCreateRequest = require("../Requests/CategoryCreateRequest");
const CategoryUpdateRequest = require("../Requests/CategoryUpdateRequest");
const CourseController = require("../Controllers/CourseController");
const CourseCreateRequest = require("../Requests/CourseCreateRequest");
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
const GetSingleCategoryRequest = require("../Requests/GetSingleCategoryRequest");
const GetSingleCourseRequest = require("../Requests/GetSingleCourseRequest");
const GetSingleCourseModuleRequest = require("../Requests/GetSingleCourseModuleRequest");
const GetSingleModuleLessonRequest = require("../Requests/GetSingleModuleLessonRequest");
const uploadFile = require("../../config/uploadFile");
const adminRouter = Router();
adminRouter.get(
  "/category/:categoryID",
  GetSingleCategoryRequest,
  CategoryController.getSingleCategory
);
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
  uploadFile("previewImage", [".png", ".jpg", ".webp", ".jpeg"]),
  CourseCreateRequest,
  CourseController.create
);

adminRouter.patch(
  "/course/:courseId",
  uploadFile("previewImage", [".png", ".jpg", ".webp", ".jpeg"]),
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
  "/course-module/:moduleID",
  GetSingleCourseModuleRequest,
  CourseModuleController.getSingleCourseModule
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

adminRouter.get("/course", async (req, res) => {
  const courses = await Course.find({
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "category",
      match: { isDeleted: false }, // This will filter the populated categories
    })
    .populate({
      path: "courseModules",
      match: { isDeleted: false },
    })
    .populate("addedBy");

  // Filter out courses without valid categories (where category is null)
  const filteredCourses = courses.filter((course) => course.category !== null);
  return res.status(200).json({ status: true, courses: filteredCourses });
});

module.exports = adminRouter;
