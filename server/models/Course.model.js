const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course is required"],
      unique: [true, "Course is already registered"],
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
