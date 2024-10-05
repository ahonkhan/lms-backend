const Category = require("../Models/Category");
const Course = require("../Models/Course");

class CourseController {
  uploadDir = path.join(__dirname, "uploads");

  static create = async (req, res) => {
    const {
      name,
      description,
      price,
      category,
      previewVideo,
      batch,
      startDate,
    } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "No file uploaded." });
    }
    try {
      const oldCourse = await Course.findOne({ name: name, batch: batch });
      if (oldCourse) {
        return res
          .status(409)
          .json({ status: false, message: "Course already exists." });
      }

      const checkCategory = await Category.findById(category);
      if (!checkCategory) {
        return res
          .status(404)
          .json({ status: false, message: "Category not found." });
      }

      const course = new Course({
        name: name,
        description: description,
        price: price,
        category: category,
        batch: batch,
        user: req.user._id,
        previewImage: req.file.filename,
        startDate: startDate,
      });

      if (previewVideo) {
        course.previewVideo = previewVideo;
      }
      await course.save();

      return res.status(201).json({
        status: true,
        message: "Course added successfully.",
        course: course,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };
}

module.exports = CourseController;
