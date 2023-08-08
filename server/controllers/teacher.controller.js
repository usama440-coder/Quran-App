const Teacher = require("../models/Teacher.model");
const Student = require("../models/Student.model");
const asyncHandler = require("express-async-handler");
const { requiredFields, checkName, checkEmail } = require("../utils/validator");

// @desc    Register Teacher
// @route   POST /api/v1/teacher
// @access  Admin
const registerTeacher = asyncHandler(async (req, res) => {
  const { name, email, contact, salary } = req.body;

  // check required Fields
  if (!requiredFields(name, email, contact, salary)) {
    res.status(400);
    throw new Error("Enter required fields");
  }

  // check name
  if (!checkName(name)) {
    res.status(400);
    throw new Error("Name should be between 5 and 50 characters");
  }

  // check email
  if (!checkEmail(email)) {
    res.status(400);
    throw new Error("Invalid email address");
  }

  // check salary
  if (salary < 0) {
    res.status(400);
    throw new Error("Invalid salary value");
  }

  // check teacher exists
  const isExists = await Teacher.findOne({ email });
  if (isExists) {
    res.status(400);
    throw new Error("Teacher already exists");
  }

  // contact check
  const contactExists = await Teacher.findOne({ contact });
  if (contactExists) {
    res.status(400);
    throw new Error("Contact already taken");
  }

  // register
  const teacher = await Teacher.create({
    name,
    email,
    contact,
    salary,
  });

  res.status(201).json({ success: true, teacher });
});

// @desc    Get all teachers
// @route   GET /api/v1/teacher
// @access  Admin
const getTeachers = asyncHandler(async (req, res) => {
  // query paramteres
  const page = parseInt(req.query.page || "0");
  const pageSize = parseInt(req.query.pageSize || "25");
  const total = await Teacher.countDocuments({});

  const teachers = await Teacher.find({})
    .skip(page * pageSize)
    .limit(pageSize);

  res.status(201).json({ success: true, teachers, totalPages: total });
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

  // total students
  const totalStudents = await Student.find({ teacher: req.params.id }).count();

  // get students
  const students = await Student.find({ teacher: req.params.id }).select({
    name: 1,
    email: 1,
  });

  res.status(200).json({ success: true, teacher, students, totalStudents });
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

  // delete students belonging to this teacher
  await Student.deleteMany({ teacher: req.params.id });

  // delete
  const deleted = await Teacher.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, deleted });
});

// @desc    Update a teacher
// @route   PUT /api/v1/teacher/:id
// @access  Admin
const updateTeacher = asyncHandler(async (req, res) => {
  const { name, email, contact, salary } = req.body;

  // check name
  if (name) {
    if (!checkName(name)) {
      res.status(400);
      throw new Error("Name should be between 5 and 50 characters");
    }
  }

  // check email
  if (email) {
    if (!checkEmail(email)) {
      res.status(400);
      throw new Error("Invalid email value");
    }
  }

  // check salary
  if (salary) {
    if (salary < 0) {
      res.status(400);
      throw new Error("Invalid salary value");
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
    { name, email, contact, salary }
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
