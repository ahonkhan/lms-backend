const { Router } = require("express");
const CategoryController = require("../Controllers/CategoryController");
const CourseController = require("../Controllers/CourseController");
const CourseDetailsGetRequest = require("../Requests/CourseDetailsGetRequest");
const Course = require("../Models/Course");
const GetSingleCourseRequest = require("../Requests/GetSingleCourseRequest");
const CourseModuleController = require("../Controllers/CourseModuleController");
const CourseModuleGetRequest = require("../Requests/course-module/CourseModuleGetRequest");
const ModuleLessonGetRequest = require("../Requests/module-lesson/ModuleLessonGetRequest");
const ModuleLessonController = require("../Controllers/ModuleLessonController");

const publicRouter = Router();

publicRouter.get("/category", CategoryController.getCategoryWithCourse);
publicRouter.get(
  "/course-details/:courseId",
  CourseDetailsGetRequest,
  CourseController.courseDetails
);

publicRouter.get(
  "/course/:courseID",
  GetSingleCourseRequest,
  CourseController.getSingleCourse
);
publicRouter.get("/course", async (req, res) => {
  const courses = await Course.find({ isDeleted: false })
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

publicRouter.get(
  "/course-module",
  CourseModuleGetRequest,
  CourseModuleController.get
);

module.exports = publicRouter;
