const Student = require("../models/Student.model");
const Teacher = require("../models/Teacher.model");
const asyncHandler = require("express-async-handler");
const { requiredFields, checkName } = require("../utils/validator");

// @desc    Register Student
// @route   POST /api/v1/student
// @access  Admin
const registerStudent = asyncHandler(async (req, res) => {
  const { name, country, joining, teacher } = req.body;

  // check required Fields
  if (!requiredFields(name, country, joining, teacher)) {
    res.status(400);
    throw new Error("Enter required fields");
  }

  // check name
  if (!checkName(name)) {
    res.status(400);
    throw new Error("Name should be between 5 and 50 characters");
  }

  //   check teacher
  const teacherExists = await Teacher.findOne({ _id: teacher });
  if (!teacherExists) {
    res.status(404);
    throw new Error("Teacher does not exist");
  }

  // register
  const student = await Student.create({
    name,
    country,
    joining,
    teacher,
  });

  res.status(201).json({ success: true, student });
});

// @desc    Get all students
// @route   GET /api/v1/student
// @access  Admin
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});

  res.status(201).json({ success: true, students });
});

// @desc    Get a single student
// @route   GET /api/v1/student/:id
// @access  Admin
const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ _id: req.params.id });

  // teacher exixts
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  res.status(200).json({ success: true, student });
});

// @desc    Delete a student
// @route   DELETE /api/v1/student/:id
// @access  Admin
const deleteStudent = asyncHandler(async (req, res) => {
  // check teacher exists
  const isExists = await Student.findOne({ _id: req.params.id });
  if (!isExists) {
    res.status(404);
    throw new Error("Student not found");
  }

  // delete
  const deleted = await Student.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, deleted });
});

// @desc    Update a student
// @route   PUT /api/v1/student/:id
// @access  Admin
const updateStudent = asyncHandler(async (req, res) => {
  const { name, country, joining, teacher } = req.body;

  // check name
  if (name) {
    if (!checkName(name)) {
      res.status(400);
      throw new Error("Name should be between 5 and 50 characters");
    }
  }

  //   check teacher
  if (teacher) {
    const teacherExists = await Teacher.findOne({ _id: teacher });
    if (!teacherExists) {
      res.status(404);
      throw new Error("Teacher does not exist");
    }
  }

  // check teacher exists
  const isExists = await Student.findOne({ _id: req.params.id });
  if (!isExists) {
    res.status(404);
    throw new Error("Student not found");
  }

  // update
  const updated = await Student.updateOne(
    { _id: req.params.id },
    { name, country, joining, teacher }
  );
  res.status(200).json({ success: true, updated });
});

module.exports = {
  registerStudent,
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
};
