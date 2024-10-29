const Course = require("../Models/Course");
const CourseModule = require("../Models/CourseModule");

class CourseModuleController {
  static create = async (req, res) => {
    const { name, description, course, startDate, endDate } = req.body;

    try {
      const oldCourseModule = await CourseModule.findOne({
        name: name,
      });
      if (oldCourseModule) {
        return res
          .status(409)
          .json({ status: false, message: "Course module already exists." });
      }

      const checkCourse = await Course.findById(course);
      if (!checkCourse || checkCourse.isDeleted === true) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found." });
      }

      const courseModule = new CourseModule({
        name: name,
        description: description,
        course: course,
        user: req.user._id,
        startDate: startDate,
        endDate: endDate,
      });
      await courseModule.save();

      return res.status(201).json({
        status: true,
        message: "Course module added successfully.",
        module: courseModule,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };

  static get = async (req, res) => {
    const { course } = req.query;
    try {
      const checkCourse = await Course.findById(course);
      if (!checkCourse || checkCourse.isDeleted === true) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found." });
      }

      const courseModules = await CourseModule.find({
        course: course,
        isDeleted: false,
      }).populate({
        path: "lessons",
        match: { isDeleted: false },
        select: "-video", // Exclude the 'video' field from the lessons
      });

      // Map through the courseModules to include additional fields
      const enhancedCourseModules = courseModules.map((module) => {
        const lessons = module.lessons || []; // Get the lessons or an empty array if none
        return {
          ...module.toObject(), // Convert to plain object
          firstLessonId: lessons.length > 0 ? lessons[0]._id : null, // First lesson ID or null if no lessons
          totalLessonCount: lessons.length, // Total lessons count
        };
      });
      return res
        .status(200)
        .json({ status: true, modules: enhancedCourseModules });
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "Server erorr", error: error.message });
    }
  };

  static update = async (req, res) => {
    const { name, description, startDate, endDate, status } = req.body;
    const moduleId = req.params.moduleId;
    try {
      const oldCourseModule = await CourseModule.findOne({
        name: name,
        isDeleted: false,
        _id: { $ne: moduleId },
      });
      if (oldCourseModule) {
        return res
          .status(409)
          .json({ status: false, message: "Course module already exists." });
      }

      const courseModule = await CourseModule.findById(moduleId);
      if (!courseModule || courseModule.isDeleted === true) {
        return res
          .status(404)
          .json({ status: false, message: "Course module not found." });
      }
      if (courseModule.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          status: false,
          message: "You do not have permission to update this course module.",
        });
      }

      if (name) courseModule.name = name;
      if (description) courseModule.description = description;
      if (startDate) courseModule.startDate = startDate;
      if (endDate) courseModule.endDate = endDate;
      if (status) courseModule.status = status;

      await courseModule.save();

      return res.status(200).json({
        status: true,
        message: "Course module updated successfully.",
        module: courseModule,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };
  static delete = async (req, res) => {
    const moduleId = req.params.moduleId;
    try {
      const courseModule = await CourseModule.findById(moduleId);
      if (!courseModule || courseModule.isDeleted === true) {
        return res
          .status(404)
          .json({ status: false, message: "Course module not found." });
      }
      if (courseModule.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          status: false,
          message: "You do not have permission to update this course module.",
        });
      }

      courseModule.isDeleted = true;

      await courseModule.save();

      return res.status(200).json({
        status: true,
        message: "Course module deleted successfully.",
        module: courseModule,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };

  static getSingleCourseModule = async (req, res) => {
    const { moduleID } = req.params;
    try {
      const module = await CourseModule.findById(moduleID);
      if (!module || module.isDeleted) {
        return res
          .status(404)
          .json({ status: true, message: "Course module not found" });
      }

      return res.status(200).json({ status: true, module: module });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
      });
    }
  };
}

module.exports = CourseModuleController;
