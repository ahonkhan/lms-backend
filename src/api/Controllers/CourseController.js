const Category = require("../Models/Category");
const Course = require("../Models/Course");
const fs = require("fs");
const path = require("path");
class CourseController {
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

  static update = async (req, res) => {
    const {
      name,
      description,
      price,
      category,
      previewVideo,
      batch,
      startDate,
      status,
    } = req.body;

    const courseId = req.params.courseId;
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found." });
      }

      if (category) {
        const checkCategory = await Category.findById(category);
        if (!checkCategory) {
          return res
            .status(404)
            .json({ status: false, message: "Category not found." });
        }
        course.category = category;
      }

      if (name) course.name = name;
      if (description) course.description = description;
      if (price) course.price = price;
      if (previewVideo) course.previewVideo = previewVideo;
      if (batch) course.batch = batch;
      if (startDate) course.startDate = startDate;
      if (status) course.status = status;

      if (req.file) {
        // remove old file
        const oldImagePath = path.join(
          __dirname,
          "../../../uploads",
          course.previewImage
        );

        // Check if the file exists and delete it
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        course.previewImage = req.file.filename;
      }

      await course.save();

      return res.status(200).json({
        status: true,
        message: "Course updated successfully.",
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
