const express = require("express");
const {
  addCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/course.controller");
const courseRouter = express.Router();

courseRouter.post("/", addCourse);
courseRouter.get("/", getCourses);
courseRouter.get("/:id", getCourse);
courseRouter.delete("/:id", deleteCourse);
courseRouter.put("/:id", updateCourse);

module.exports = courseRouter;
