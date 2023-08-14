const express = require("express");
const {
  addFee,
  addFeeSingleStudent,
  getFee,
  getFeeSingleStudent,
  updateFee,
  deleteFee,
} = require("../controllers/fee.controller");
const { protect } = require("../middleware/auth.middleware");
const feeRouter = express.Router();

feeRouter.post("/", protect, addFee);
feeRouter.post("/:id", protect, addFeeSingleStudent);
feeRouter.get("/", protect, getFee);
feeRouter.get("/:id", protect, getFeeSingleStudent);
feeRouter.put("/:id", protect, updateFee);
feeRouter.delete("/:id", protect, deleteFee);

module.exports = feeRouter;
