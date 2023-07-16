const express = require("express");
const {
  addFee,
  addFeeSingleStudent,
  getFee,
  getFeeSingleStudent,
  updateFee,
  deleteFee,
} = require("../controllers/fee.controller");
const feeRouter = express.Router();

feeRouter.post("/", addFee);
feeRouter.post("/:id", addFeeSingleStudent);
feeRouter.get("/", getFee);
feeRouter.get("/:id", getFeeSingleStudent);
feeRouter.put("/:id", updateFee);
feeRouter.delete("/:id", deleteFee);

module.exports = feeRouter;
