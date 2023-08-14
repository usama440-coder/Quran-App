const express = require("express");
const adminRouter = express.Router();
const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/admin.controller");

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);

module.exports = adminRouter;
