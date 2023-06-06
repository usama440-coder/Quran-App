const Admin = require("../models/Admin.model");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const {
  requiredFields,
  checkEmail,
  checkName,
  checkPassword,
} = require("../utils/validator");

// @desc    Register Admin
// @route   POST /api/v1/admin/register
// @access  Admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check required fields
  if (!requiredFields(name, email, password)) {
    res.status(400);
    throw new Error("Required fields not provided");
  }

  // check name validation
  if (!checkName(name)) {
    res.status(400);
    throw new Error("Name should be between 5 and 50 characters");
  }

  // check email validation
  if (!checkEmail(email)) {
    res.status(400);
    throw new Error("Invalid email value");
  }

  // check password
  if (!checkPassword(password)) {
    res.status(400);
    throw new Error("Password length should be between 6 and 20 characters");
  }

  //   check admin
  const isExists = await Admin.findOne({ email });
  if (isExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  //   register
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ success: true, admin });
});

module.exports = { registerAdmin };
