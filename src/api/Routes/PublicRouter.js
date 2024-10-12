const { Router } = require("express");
const CategoryController = require("../Controllers/CategoryController");
const CourseController = require("../Controllers/CourseController");
const CourseDetailsGetRequest = require("../Requests/CourseDetailsGetRequest");

const publicRouter = Router();

publicRouter.get("/category", CategoryController.getCategoryWithCourse);
publicRouter.get(
  "/course-details/:courseId",
  CourseDetailsGetRequest,
  CourseController.courseDetails
);

module.exports = publicRouter;
