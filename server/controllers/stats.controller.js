const asyncHandler = require("express-async-handler");
const Course = require("../models/Course.model");
const Student = require("../models/Student.model");
const Teacher = require("../models/Teacher.model");

// @desc    Get stats
// @route   GET /api/v1/stats
// @access  Admin
const getStats = asyncHandler(async (req, res) => {
  const totalStudents = await Student.find({}).count();
  const totalTeachers = await Teacher.find({}).count();
  const totalCourses = await Course.find({}).count();

  res.status(200).json({
    success: true,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
});

module.exports = {
  getStats,
};
