const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already taken"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address",
      ],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 4,
      maxLength: 50,
    },
    contactOne: {
      type: String,
      required: [true, "Contact is required"],
      unique: [true, "Contact is already taken"],
    },
    contactTwo: {
      type: String,
      unique: [true, "Contact is already taken"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Teacher is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
