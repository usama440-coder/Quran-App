const asyncHandler = require("express-async-handler");
const { requiredFields } = require("../utils/validator");
const Course = require("../models/Course.model");

// @desc    Add a course
// @route   POST /api/v1/course
// @access  Admin
const addCourse = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // check name is given
  if (!requiredFields(name)) {
    res.status(400);
    throw new Error("Course name is not provided");
  }

  // course exists
  const isExists = await Course.findOne({ name });
  if (isExists) {
    res.status(400);
    throw new Error("Course already exists");
  }

  const course = await Course.create({ name });

  res.status(201).json({ success: true, course });
});

// @desc    Get all courses
// @route   GET /api/v1/course
// @access  Admin
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});

  res.status(200).json({ success: true, courses });
});

// @desc    Get single course
// @route   GET /api/v1/course/:id
// @access  Admin
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });

  // course not exists
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  res.status(200).json({ success: true, course });
});

// @desc    Delete a course
// @route   DELETE /api/v1/course/:id
// @access  Admin
const deleteCourse = asyncHandler(async (req, res) => {
  // check course exists
  const isExists = await Course.findOne({ _id: req.params.id });
  if (!isExists) {
    res.status(400);
    throw new Error("Course not found");
  }

  const deleted = await Course.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, deleted });
});

// @desc    Update a course
// @route   PUT /api/v1/course/:id
// @access  Admin
const updateCourse = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // check course exists
  const isExists = await Course.findOne({ _id: req.params.id });
  if (!isExists) {
    res.status(400);
    throw new Error("Course not found");
  }

  const updated = await Course.updateOne({ _id: req.params.id }, { name });
  res.status(200).json({ success: true, updated });
});

module.exports = {
  addCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
};
