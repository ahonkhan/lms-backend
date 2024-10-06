const { Schema, model, Types } = require("mongoose");

const CourseModuleSchema = new Schema(
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

    course: {
      type: Types.ObjectId,
      required: true,
      ref: "Course",
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
    endDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CourseModule = model("CourseModule", CourseModuleSchema);
module.exports = CourseModule;
