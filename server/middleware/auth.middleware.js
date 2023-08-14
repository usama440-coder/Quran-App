const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin.model");

// token verification
const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findOne({ _id: decoded.id }).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = {
  protect,
};
