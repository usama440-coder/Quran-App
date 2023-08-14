const express = require("express");
const studentRouter = express.Router();
const {
  registerStudent,
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/student.controller");
const { protect } = require("../middleware/auth.middleware");

studentRouter.post("/", protect, registerStudent);
studentRouter.get("/", protect, getStudents);
studentRouter.get("/:id", protect, getStudent);
studentRouter.delete("/:id", protect, deleteStudent);
studentRouter.put("/:id", protect, updateStudent);

module.exports = studentRouter;
