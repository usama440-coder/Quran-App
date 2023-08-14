const asyncHandler = require("express-async-handler");
const { requiredFields } = require("../utils/validator");
const Fee = require("../models/Fee.model");
const Student = require("../models/Student.model");
const { mongoose } = require("mongoose");

// @desc    Add a fee
// @route   POST /api/v1/fee
// @access  Admin
const addFee = asyncHandler(async (req, res) => {
  let { date } = req.body;

  // set the date to 1st
  let feeDate = new Date(date);
  feeDate.setHours(0);
  feeDate.setMinutes(0);
  feeDate.setSeconds(0);
  feeDate.setDate(1);

  // chech date is given
  if (!requiredFields(date)) {
    res.status(400);
    throw new Error("Enter required fields");
  }

  // get students
  const students = await Student.find({});

  //   array to contain all the students fee
  let feeEntries = [];

  for (let student of students) {
    // check if student already paid a fee for a month
    const isExists = await Fee.findOne({
      student: student._id,
      date: { $eq: feeDate },
    });

    // if not paid add fee to the array
    if (!isExists) {
      const studentFee = {
        date: feeDate,
        amount: student.fee,
        student: student._id,
      };

      feeEntries.push(studentFee);
    }
  }

  if (feeEntries.length !== 0) {
    const fee = await Fee.insertMany(feeEntries);
    return res.status(201).json({ success: true, fee });
  }

  res.status(400).json({
    success: false,
    message: "Fee already generated for a given month",
  });
});

// @desc    Add a fee for single student
// @route   POST /api/v1/fee/:id
// @access  Admin
const addFeeSingleStudent = asyncHandler(async (req, res) => {
  const { date } = req.body;
  const email = req.params.id;

  // chech date is given
  if (!requiredFields(date)) {
    res.status(400);
    throw new Error("Enter required fields");
  }

  // set the date to 1st
  let feeDate = new Date(date);
  feeDate.setHours(0);
  feeDate.setMinutes(0);
  feeDate.setSeconds(0);
  feeDate.setDate(1);

  // get student
  const student = await Student.findOne({ email });
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  // check if student already paid a fee for a month
  const isExists = await Fee.findOne({
    student: student._id,
    date: { $gte: feeDate },
  });

  if (!isExists) {
    const fee = await Fee.create({
      date: feeDate,
      amount: student.fee,
      student: student._id,
    });
    return res.status(201).json({ success: true, fee });
  }

  res.status(400).json({
    success: false,
    message: "Fee already generated for a given month",
  });
});

// @desc    Get all fee
// @route   GET /api/v1/fee/
// @access  Admin
const getFee = asyncHandler(async (req, res) => {
  // query paramteres
  const page = parseInt(req.query.page || "0");
  const pageSize = parseInt(req.query.pageSize || "25");
  const email = req.query.email || "";
  const total = await Fee.countDocuments({});
  let fee;

  if (email) {
    // find student
    const student = await Student.findOne({ email });
    if (!student) {
      res.status(404);
      throw new Error("Student not found");
    }
    fee = await Fee.aggregate([
      {
        $match: {
          student: new mongoose.Types.ObjectId(student?._id),
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: {
          path: "$student",
        },
      },
      {
        $project: {
          _id: 1,
          date: 1,
          amount: 1,
          isPaid: 1,
          studentId: "$student._id",
          studentName: "$student.name",
          studentEmail: "$student.email",
        },
      },
      {
        $skip: pageSize * page,
      },
      {
        $limit: pageSize,
      },
    ]);
  } else {
    fee = await Fee.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: {
          path: "$student",
        },
      },
      {
        $project: {
          _id: 1,
          date: 1,
          amount: 1,
          isPaid: 1,
          studentId: "$student._id",
          studentName: "$student.name",
          studentEmail: "$student.email",
        },
      },
      {
        $skip: pageSize * page,
      },
      {
        $limit: pageSize,
      },
    ]);
  }

  res.status(200).json({ success: true, fee, totalPages: total });
});

// @desc    Get a single fee
// @route   GET /api/v1/fee/:id
// @access  Admin
const getFeeSingleStudent = asyncHandler(async (req, res) => {
  const fee = await Fee.findOne({ _id: req.params.id });

  // get student
  const student = await Student.findOne({ _id: fee.student }).select(
    "email name"
  );

  // fee exists
  if (!fee) {
    res.status(404);
    throw new Error("Fee does not exist");
  }

  res.status(200).json({ success: true, fee, student });
});

// @desc    Update a fee
// @route   PUT /api/v1/fee/:id
// @access  Admin
const updateFee = asyncHandler(async (req, res) => {
  const { isPaid, amount } = req.body;

  // check required fields
  if (isPaid !== true && isPaid !== false && !requiredFields(amount)) {
    res.status(400);
    throw new Error("Enter required fields");
  }

  // fee exists
  const fee = await Fee.findOne({ _id: req.params.id });
  if (!fee) {
    res.status(404);
    throw new Error("Fee does not exist");
  }

  const updated = await Fee.updateOne(
    { _id: req.params.id },
    { isPaid, amount }
  );

  res.status(200).json({ success: true, updated });
});

// @desc    Delete a fee
// @route   DELETE /api/v1/fee/:id
// @access  Admin
const deleteFee = asyncHandler(async (req, res) => {
  // fee exists
  const fee = await Fee.findOne({ _id: req.params.id });
  if (!fee) {
    res.status(404);
    throw new Error("Fee does not exist");
  }

  const deleted = await Fee.deleteOne({ _id: req.params.id });

  res.status(200).json({ success: true, deleted });
});

module.exports = {
  addFee,
  addFeeSingleStudent,
  getFee,
  getFeeSingleStudent,
  updateFee,
  deleteFee,
};
