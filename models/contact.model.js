const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: {
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
    required: true,
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

contactSchema.index({ user: 1, phone: 1 }, { unique: true });

module.exports = mongoose.model("Contact", contactSchema);
