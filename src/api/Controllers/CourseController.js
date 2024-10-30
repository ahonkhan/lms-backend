const Category = require("../Models/Category");
const Course = require("../Models/Course");
const fs = require("fs");
const path = require("path");
const CourseModule = require("../Models/CourseModule");
const Order = require("../Models/Order");
const {
  uploadFileToCloud,
  deleteFileFromCloud,
} = require("../../config/cloudenery");
const cloudinary = require("cloudinary").v2;
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
    // if (!req.file) {
    //   return res
    //     .status(400)
    //     .json({ status: false, message: "No file uploaded." });
    // }

    try {
      const oldCourse = await Course.findOne({ name: name, batch: batch });
      if (oldCourse) {
        return res
          .status(409)
          .json({ status: false, message: "Course already exists." });
      }

      const checkCategory = await Category.findById(category);
      if (!checkCategory || checkCategory.isDeleted === true) {
        return res
          .status(404)
          .json({ status: false, message: "Category not found." });
      }
      const result = await uploadFileToCloud(req.file.path, {
        folder: "images", // Optional: specify a folder
      });
      const fileUrl = result.secure_url;
      const publicId = result.public_id;
      const course = new Course({
        name: name,
        description: description,
        price: price,
        category: category,
        batch: batch,
        user: req.user._id,
        previewImage: fileUrl,
        startDate: startDate,
        publicId: publicId,
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
      if (!course || course.isDeleted === true) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found." });
      }

      if (category) {
        const checkCategory = await Category.findById(category);
        if (!checkCategory || checkCategory.isDeleted) {
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
        await deleteFileFromCloud(course.publicId);
        const result = await uploadFileToCloud(req.file.path, {
          folder: "images", // Optional: specify a folder
        });
        const fileUrl = result.secure_url;
        const publicId = result.public_id;

        course.previewImage = fileUrl;
        course.publicId = publicId;
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

  static delete = async (req, res) => {
    const courseId = req.params.courseId;

    try {
      const course = await Course.findById(courseId).populate({
        path: "category",
        match: { isDeleted: false },
      });

      if (!course || course.isDeleted) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found." });
      }
      if (course.category === null) {
        return res
          .status(404)
          .json({ status: false, message: "Course may be removed." });
      }

      course.isDeleted = true;
      await course.save();
      await deleteFileFromCloud(course.publicId);
      return res.status(200).json({
        status: true,
        message: "Course deleted successfully.",
        id: course._id,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };

  static courseDetails = async (req, res) => {
    const courseId = req.params.courseId;
    try {
      const course = await Course.findById(courseId);
      if (!course || course.isDeleted) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found." });
      }
      const modules = await CourseModule.find({
        course: courseId,
        isDeleted: false,
      });

      return res
        .status(200)
        .json({ status: true, course: course, modules: modules });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };

  static getEnrolledCourse = async (req, res) => {
    const { course } = req.params;
    // check course
    try {
      const selectedCourse = await Course.findById(course);
      if (!selectedCourse || selectedCourse.isDeleted) {
        return res
          .status(404)
          .json({ status: false, message: "Course not found." });
      }

      // check course enrolled or not
      if (req.user?.role === "customer") {
        const order = await Order.findOne({
          user: req.user._id,
          course: course,
        });
        if (!order) {
          return res.status(403).json({
            status: false,
            message: "You have not yet enrolled.",
            course: selectedCourse._id,
          });
        }
      }

      // now return all resources
      const courseModules = await CourseModule.find({
        course: course,
        isDeleted: false,
      }).populate({
        path: "lessons",
        match: { isDeleted: false },
      });

      return res
        .status(200)
        .json({ status: true, course: selectedCourse, modules: courseModules });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
        error: error.message,
      });
    }
  };

  static getSingleCourse = async (req, res) => {
    const { courseID } = req.params;
    try {
      const course = await Course.findById(courseID);
      if (!course || course.isDeleted) {
        return res
          .status(404)
          .json({ status: true, message: "Course not found" });
      }
      const modules = await CourseModule.find({
        course: courseID,
        isDeleted: false,
      });

      const lessons = await ModuleLesson.find({
        course: courseID,
        isDeleted: false,
      }).select("_id");
      let enrolled = false;
      if (req.user) {
        const order = await Order.findOne({
          user: req.user._id,
          course: courseID,
        });
        if (order) {
          enrolled = true;
        }
      }
      return res.status(200).json({
        status: true,
        course: course,
        modules: modules,
        lessons: lessons,
        enrolled: enrolled,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
      });
    }
  };

  static getCoursesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
      const courses = await Course.find({
        category: category,
        isDeleted: false,
      }).populate({
        path: "courseModules",
        match: { isDeleted: false },
      });

      return res.status(200).json({ status: true, courses: courses });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
      });
    }
  };
}

module.exports = CourseController;
