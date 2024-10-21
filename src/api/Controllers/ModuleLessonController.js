const CourseModule = require("../Models/CourseModule");
const ModuleLesson = require("../Models/ModuleLesson");

class ModuleLessonController {
  static create = async (req, res) => {
    const { module, name, description, video } = req.body;
    // check that module exists or not
    try {
      const courseModule = await CourseModule.findById(module);
      if (!courseModule) {
        return res
          .status(404)
          .json({ status: false, message: "Module not found." });
      }

      const moduleLesson = new ModuleLesson({
        courseModule: module,
        user: req.user._id,
        name: name,
        description: description,
        video: video,
        course: courseModule.course,
      });

      await moduleLesson.save();
      return res.status(201).json({
        status: true,
        message: "Module lesson added successfully.",
        lesson: moduleLesson,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };
  static update = async (req, res) => {
    const { name, description, video } = req.body;
    const lessonId = req.params.lessonId;
    try {
      const moduleLesson = await ModuleLesson.findById(lessonId);
      if (!moduleLesson) {
        return res
          .status(404)
          .json({ status: false, message: "Module lesson not found." });
      }

      if (name) moduleLesson.name = name;
      if (description) moduleLesson.description = description;
      if (video) moduleLesson.video = video;

      await moduleLesson.save();
      return res.status(200).json({
        status: true,
        message: "Module lesson updated successfully.",
        lesson: moduleLesson,
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
    const lessonId = req.params.lessonId;
    try {
      const moduleLesson = await ModuleLesson.findById(lessonId);
      if (!moduleLesson || moduleLesson.isDeleted === true) {
        return res
          .status(404)
          .json({ status: false, message: "Module lesson not found." });
      }
      if (moduleLesson.user.toString() !== req.user._id.toString()) {
        return res
          .status(404)
          .json({ status: false, message: "Module lesson not found." });
      }
      moduleLesson.isDeleted = true;

      await moduleLesson.save();
      return res
        .status(200)
        .json({ status: true, message: "Module lesson deleted successfully." });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };
  static get = async (req, res) => {
    const moduleId = req.query.module;
    try {
      const courseModule = await CourseModule.findById(moduleId);
      if (
        !courseModule ||
        courseModule.user.toString() !== req.user._id.toString()
      ) {
        return res
          .status(404)
          .json({ status: false, message: "Course Module not found." });
      }

      const moduleLessons = await ModuleLesson.find({
        courseModule: moduleId,
        isDeleted: false,
      });
      return res.status(200).json({
        status: true,
        moduleLessons: moduleLessons,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };
  static getSingleModuleLesson = async (req, res) => {
    const { lessonID } = req.params;
    try {
      const lesson = await ModuleLesson.findById(lessonID);
      if (!lesson || lesson.isDeleted) {
        return res
          .status(404)
          .json({ status: true, message: "Module lesson not found" });
      }

      return res.status(200).json({ status: true, lesson: lesson });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
      });
    }
  };
}

module.exports = ModuleLessonController;
