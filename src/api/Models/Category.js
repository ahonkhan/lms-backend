const { Schema, model, Types } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
categorySchema.virtual("courses", {
  ref: "Course", // The model to populate (Course)
  localField: "_id", // Field in Category that links to Course
  foreignField: "category", // Field in Course that links to Category
  justOne: false, // Set to false since a category can have multiple courses
});
categorySchema.set("toJSON", { virtuals: true });
categorySchema.set("toObject", { virtuals: true });

const Category = model("Category", categorySchema);

module.exports = Category;
