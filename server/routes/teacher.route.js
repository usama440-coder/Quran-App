const express = require("express");
const teacherRouter = express.Router();
const {
  registerTeacher,
  getTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/teacher.controller");

teacherRouter.post("/", registerTeacher);
teacherRouter.get("/", getTeachers);
teacherRouter.get("/:id", getTeacher);
teacherRouter.delete("/:id", deleteTeacher);
teacherRouter.put("/:id", updateTeacher);

module.exports = teacherRouter;
