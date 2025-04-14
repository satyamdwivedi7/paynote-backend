const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  totalLent: {
    type: Number,
    default: 0,
  },
  totalBorrowed: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
