const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./database/db");
const errorHandler = require("./middleware/error.middleware");
const adminRouter = require("./routes/admin.route");
const teacherRouter = require("./routes/teacher.route");
const studentRouter = require("./routes/student.route");
const courseRouter = require("./routes/course.route");
const statsRouter = require("./routes/stats.route");
const feeRouter = require("./routes/fee.route");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/stats", statsRouter);
app.use("/api/v1/fee", feeRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log("Server is listening on port " + PORT);
});
