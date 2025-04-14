const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["lend", "borrow"],
    required: true,
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isSettled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
