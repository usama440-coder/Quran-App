const express = require("express");
const studentRouter = express.Router();
const {
  registerStudent,
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/student.controller");

studentRouter.post("/", registerStudent);
studentRouter.get("/", getStudents);
studentRouter.get("/:id", getStudent);
studentRouter.delete("/:id", deleteStudent);
studentRouter.put("/:id", updateStudent);

module.exports = studentRouter;
