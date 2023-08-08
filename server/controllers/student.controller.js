const Student = require("../models/Student.model");
const Course = require("../models/Course.model");
const Teacher = require("../models/Teacher.model");
const asyncHandler = require("express-async-handler");
const { requiredFields, checkName, checkEmail } = require("../utils/validator");

// @desc    Register Student
// @route   POST /api/v1/student
// @access  Admin
const registerStudent = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    contactOne,
    contactTwo,
    age,
    skype,
    country,
    teacher,
    course,
    afterTwelve,
    fee,
  } = req.body;

  // check required Fields
  if (
    !requiredFields(
      name,
      email,
      contactOne,
      age,
      skype,
      country,
      fee,
      teacher,
      course
    )
  ) {
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
    throw new Error("Invalid email");
  }

  // check age
  if (age < 0) {
    res.status(400);
    throw new Error("Invalid age value");
  }

  // check fee
  if (fee < 0) {
    res.status(400);
    throw new Error("Invalid fee value");
  }

  // student exists
  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    res.status(400);
    throw new Error("Student already exists");
  }

  //   teacher exists
  const teacherExists = await Teacher.findOne({ _id: teacher });
  if (!teacherExists) {
    res.status(404);
    throw new Error("Teacher does not exist");
  }

  //   course exists
  const courseExists = await Course.findOne({ _id: course });
  if (!courseExists) {
    res.status(404);
    throw new Error("Course does not exist");
  }

  // register
  const student = await Student.create({
    name,
    email,
    contactOne,
    contactTwo,
    age,
    skype,
    country,
    teacher,
    course,
    afterTwelve,
    fee,
  });

  res.status(201).json({ success: true, student });
});

// @desc    Get all students
// @route   GET /api/v1/student
// @access  Admin
const getStudents = asyncHandler(async (req, res) => {
  // query paramteres
  const page = parseInt(req.query.page || "0");
  const pageSize = parseInt(req.query.pageSize || "25");
  const total = await Student.countDocuments({});

  const students = await Student.find({})
    .skip(page * pageSize)
    .limit(pageSize);

  res.status(201).json({ success: true, students, totalPages: total });
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
  const {
    name,
    email,
    contactOne,
    contactTwo,
    age,
    skype,
    country,
    teacher,
    course,
    afterTwelve,
    fee,
  } = req.body;

  // check student
  const studentExists = await Student.findOne({ _id: req.params.id });
  if (!studentExists) {
    res.status(404);
    throw new Error("Student not found");
  }

  // check name
  if (name) {
    if (!checkName(name)) {
      res.status(400);
      throw new Error("Name should be between 5 and 50 characters");
    }
  }

  // check email
  if (email && !checkEmail(email)) {
    res.status(400);
    throw new Error("Invalid email");
  }

  // check age
  if (age && age < 0) {
    res.status(400);
    throw new Error("Invalid age value");
  }

  // check fee
  if (fee && fee < 0) {
    res.status(400);
    throw new Error("Invalid fee value");
  }

  //   check teacher
  if (teacher) {
    const teacherExists = await Teacher.findOne({ _id: teacher });
    if (!teacherExists) {
      res.status(404);
      throw new Error("Teacher does not exist");
    }
  }

  // check course
  if (course) {
    const courseExists = await Course.findOne({ _id: course });
    if (!courseExists) {
      res.status(404);
      throw new Error("Course does not exist");
    }
  }

  // update
  const updated = await Student.updateOne(
    { _id: req.params.id },
    {
      name,
      email,
      contactOne,
      contactTwo,
      age,
      skype,
      country,
      teacher,
      course,
      afterTwelve,
    }
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
