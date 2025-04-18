const Transaction = require("../models/transaction.model");
const Contact = require("../models/contact.model");
const createTransaction = async (req, res) => {
  const { name, phone, amount, type, note } = req.body;
  try {
    let contact = await Contact.findOne({ user: req.user._id, phone });
    if (!contact) {
      contact = new Contact({
        user: req.user._id,
        name: name,
        phone,
        totalLent: type === "lent" ? amount : 0,
        totalBorrowed: type === "borrowed" ? amount : 0,
      });
      await contact.save();
    } else {
      if (type === "lent") {
        if (contact.totalBorrowed >= amount) {
          contact.totalBorrowed -= amount; // Reduce totalBorrowed first
        } else {
          contact.totalLent += amount - contact.totalBorrowed; // Add the remaining amount to totalLent
          contact.totalBorrowed = 0; // Reset totalBorrowed
        }
      } else if (type === "borrowed") {
        if (contact.totalLent >= amount) {
          contact.totalLent -= amount; // Reduce totalLent first
        } else {
          contact.totalBorrowed += amount - contact.totalLent; // Add the remaining amount to totalBorrowed
          contact.totalLent = 0; // Reset totalLent
        }
      }
      contact = await contact.save();
    }
    const transaction = new Transaction({
      user: req.user._id,
      contact: contact._id,
      amount,
      type,
      note,
    });
    await transaction.save();
    return res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTransactionsByContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      user: req.user._id,
      phone: req.body.phone,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    const transactions = await Transaction.find({
      user: req.user._id,
      contact: contact._id,
    }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTransactionByUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ date: -1 })
      .populate("contact", ["name", "phone"]); // Correctly chain populate

    res.json(transactions); // Send the populated transactions as the response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createTransaction,
  getTransactionsByContact,
  getTransactionByUser,
};
