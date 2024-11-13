const { Schema, model, Types } = require("mongoose");

const LessonProgressSchema = new Schema(
  {
    moduleLesson: {
      type: Types.ObjectId,
      required: true,
      ref: "ModuleLesson",
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },

    status: {
      type: String,
      required: true,
      default: "default",
    },
  },
  { timestamps: true }
);

const LessonProgress = model("LessonProgress", LessonProgressSchema);
module.exports = LessonProgress;
