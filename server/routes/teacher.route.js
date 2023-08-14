const express = require("express");
const teacherRouter = express.Router();
const {
  registerTeacher,
  getTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/teacher.controller");
const { protect } = require("../middleware/auth.middleware");

teacherRouter.post("/", protect, registerTeacher);
teacherRouter.get("/", protect, getTeachers);
teacherRouter.get("/:id", protect, getTeacher);
teacherRouter.delete("/:id", protect, deleteTeacher);
teacherRouter.put("/:id", protect, updateTeacher);

module.exports = teacherRouter;
