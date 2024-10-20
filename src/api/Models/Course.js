const { Schema, model, Types } = require("mongoose");

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    previewImage: {
      type: String,
      required: true,
    },
    previewVideo: {
      type: String,
      default: "",
    },
    batch: {
      type: Number,
      default: 1,
      required: true,
    },
    category: {
      type: Types.ObjectId,
      required: true,
      ref: "Category",
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
    status: {
      type: String,
      required: true,
      default: "upcoming",
    },
    startDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
courseSchema.virtual("courseModules", {
  ref: "CourseModule",
  localField: "_id",
  foreignField: "course",
  justOne: false,
});

courseSchema.set("toJSON", { virtuals: true });
courseSchema.set("toObject", { virtuals: true });
const Course = model("Course", courseSchema);
module.exports = Course;
