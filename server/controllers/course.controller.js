const asyncHandler = require("express-async-handler");
const { requiredFields } = require("../utils/validator");
const Course = require("../models/Course.model");
const Student = require("../models/Student.model");

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
  const isExists = await Course.findOne({ name: name.toLowerCase() });
  if (isExists) {
    res.status(400);
    throw new Error("Course already exists");
  }

  // course length should be atleast 4 characters
  if (name.length < 4) {
    res.status(400);
    throw new Error("Course name should be atleast 4 characters");
  }

  const course = await Course.create({ name });

  res.status(201).json({ success: true, course });
});

// @desc    Get all courses
// @route   GET /api/v1/course
// @access  Admin
const getCourses = asyncHandler(async (req, res) => {
  // query paramteres
  const page = parseInt(req.query.page || "0");
  const pageSize = parseInt(req.query.pageSize || "25");
  const total = await Course.countDocuments({});

  const courses = await Course.aggregate([
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "course",
        as: "students",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        createdAt: 1,
        updatedAt: 1,
        numOfStudents: {
          $size: "$students",
        },
      },
    },
    {
      $skip: pageSize * page,
    },
    {
      $limit: pageSize,
    },
  ]);

  res.status(200).json({ success: true, courses, totalPages: total });
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

  // delete student belonging to this course
  await Student.deleteMany({ course: req.params.id });

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
