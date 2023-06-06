const express = require("express");
const adminRouter = express.Router();
const { registerAdmin } = require("../controllers/admin.controller");

adminRouter.post("/", registerAdmin);

module.exports = adminRouter;
