const Teacher = require("../models/Teacher.model");
const asyncHandler = require("express-async-handler");
const { requiredFields, checkName } = require("../utils/validator");

// @desc    Register Teacher
// @route   POST /api/v1/teacher
// @access  Admin
const registerTeacher = asyncHandler(async (req, res) => {
  const { name, country } = req.body;

  // check required Fields
  if (!requiredFields(name, country)) {
    res.status(400);
    throw new Error("Enter required fields");
  }

  // check name
  if (!checkName(name)) {
    res.status(400);
    throw new Error("Name should be between 5 and 50 characters");
  }

  // register
  const teacher = await Teacher.create({
    name,
    country,
  });

  res.status(201).json({ success: true, teacher });
});

// @desc    Get all teachers
// @route   GET /api/v1/teacher
// @access  Admin
const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find({});

  res.status(201).json({ success: true, teachers });
});

// @desc    Get a single teacher
// @route   GET /api/v1/teacher/:id
// @access  Admin
const getTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({ _id: req.params.id });

  // teacher exixts
  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  res.status(200).json({ success: true, teacher });
});

// @desc    Delete a teacher
// @route   DELETE /api/v1/teacher/:id
// @access  Admin
const deleteTeacher = asyncHandler(async (req, res) => {
  // check teacher exists
  const isExists = await Teacher.findOne({ _id: req.params.id });
  if (!isExists) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  // delete
  const deleted = await Teacher.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, deleted });
});

// @desc    Update a teacher
// @route   PUT /api/v1/teacher/:id
// @access  Admin
const updateTeacher = asyncHandler(async (req, res) => {
  const { name, country } = req.body;

  // check name
  if (name) {
    if (!checkName(name)) {
      res.status(400);
      throw new Error("Name should be between 5 and 50 characters");
    }
  }

  // check teacher exists
  const isExists = await Teacher.findOne({ _id: req.params.id });
  if (!isExists) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  // update
  const updated = await Teacher.updateOne(
    { _id: req.params.id },
    { name, country }
  );
  res.status(200).json({ success: true, updated });
});

module.exports = {
  registerTeacher,
  getTeachers,
  getTeacher,
  deleteTeacher,
  updateTeacher,
};
