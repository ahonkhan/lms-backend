const { Schema, model, Types } = require("mongoose");

const ModuleLessonSchema = new Schema(
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

    courseModule: {
      type: Types.ObjectId,
      required: true,
      ref: "CourseModule",
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
    video: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ModuleLesson = model("ModuleLesson", ModuleLessonSchema);
module.exports = ModuleLesson;
