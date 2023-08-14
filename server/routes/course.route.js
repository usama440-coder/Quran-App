const express = require("express");
const {
  addCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/course.controller");
const { protect } = require("../middleware/auth.middleware");
const courseRouter = express.Router();

courseRouter.post("/", protect, addCourse);
courseRouter.get("/", protect, getCourses);
courseRouter.get("/:id", protect, getCourse);
courseRouter.delete("/:id", protect, deleteCourse);
courseRouter.put("/:id", protect, updateCourse);

module.exports = courseRouter;
