const { default: mongoose } = require("mongoose");
const Category = require("../Models/Category");

class CategoryController {
  static create = async (req, res) => {
    const { name } = req.body;
    // check is exits or not
    try {
      const oldCategory = await Category.findOne({ name: name });
      if (oldCategory) {
        return res
          .status(409)
          .json({ status: false, message: "Category already exists" });
      }
      const category = new Category({ name: name, user: req.user._id });
      await category.save();
      return res.status(201).json({
        status: true,
        message: "Category created successfully",
        category: category,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "An error occurred while creating the category",
      });
    }
  };

  static update = async (req, res) => {
    const { name } = req.body;
    const categoryId = req.params.id;

    try {
      const oldCategory = await Category.findOne({
        name: name,
        isDeleted: false,
      });
      if (oldCategory) {
        return res
          .status(409)
          .json({ status: false, message: "Category already exists" });
      }

      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res
          .status(404)
          .json({ status: false, message: "Category not found." });
      }

      const category = await Category.findById(categoryId);
      if (!category || category.isDeleted === true) {
        return res
          .status(404)
          .json({ status: false, message: "Category not found." });
      }
      if (category.user !== req.user._id) {
        return res.status(401).json({
          status: false,
          message: "You have no permission to perform the operation",
        });
      }
      if (name) {
        category.name = name;
      }
      await category.save();

      return res.status(200).json({
        status: true,
        message: "Category updated successfully",
        category: category,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "An error occurred while creating the category",
      });
    }
  };

  static delete = async (req, res) => {
    const categoryId = req.params.id;

    try {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res
          .status(404)
          .json({ status: false, message: "Category not found." });
      }

      const category = await Category.findById(categoryId);
      if (!category || category.isDeleted === true) {
        return res
          .status(404)
          .json({ status: false, message: "Category not found." });
      }
      category.isDeleted = true;

      await category.save();

      return res.status(200).json({
        status: true,
        message: "Category deleted successfully",
        id: category._id,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while deleting the category",
      });
    }
  };

  static getCategoryWithCourseCount = async (req, res) => {
    try {
      const categories = await Category.find({ isDeleted: false }).sort({
        createdAt: -1,
      });

      return res.status(200).json({
        status: true,
        categories: categories,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "An error occurred while fetching categories",
      });
    }
  };

  static getCategoryWithCourse = async (req, res) => {
    try {
      const categories = await Category.find({ isDeleted: false })
        .sort({
          createdAt: -1,
        })
        .populate({
          path: "courses",
          match: { isDeleted: false },
          options: { sort: { createdAt: -1 } },
        });
      return res.status(200).json({
        status: true,
        categories: categories,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "An error occurred while fetching categories",
      });
    }
  };

  static getSingleCategory = async (req, res) => {
    const { categoryID } = req.params;
    try {
      const category = await Category.findById(categoryID);
      if (!category || category.isDeleted) {
        return res
          .status(404)
          .json({ status: true, message: "Category not found" });
      }

      return res.status(200).json({ status: true, category: category });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error.",
      });
    }
  };
}

module.exports = CategoryController;
