const { Router } = require("express");
const CategoryController = require("../Controllers/CategoryController");
const CategoryCreateRequest = require("../Requests/CategoryCreateRequest");
const CategoryUpdateRequest = require("../Requests/CategoryUpdateRequest");
const CourseController = require("../Controllers/CourseController");
const CourseCreateRequest = require("../Requests/CourseCreateRequest");
const upload = require("../../config/upload");
const uploadFile = require("../../config/upload");
const CourseUpdateRequest = require("../Requests/CourseUpdateRequest");
const Course = require("../Models/Course");
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

module.exports = adminRouter;
