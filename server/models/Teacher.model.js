const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 4,
      maxLength: 50,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
