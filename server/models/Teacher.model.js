const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address",
      ],
      unique: [true, "Email is already taken"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      unique: [true, "Contact is already taken"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is not provided"],
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
