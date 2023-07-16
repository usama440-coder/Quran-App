const mongoose = require("mongoose");

const FeeSchema = mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Month is required"],
  },
  amount: {
    type: Number,
    min: 0,
    require: [true, "Amount is required"],
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Student is required"],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Fee", FeeSchema);
