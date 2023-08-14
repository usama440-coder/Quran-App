const express = require("express");
const { getStats } = require("../controllers/stats.controller");
const { protect } = require("../middleware/auth.middleware");
const statsRouter = express.Router();

statsRouter.get("/", protect, getStats);

module.exports = statsRouter;
