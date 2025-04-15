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
        contact.totalLent += amount;
      } else if (type === "borrowed") {
        contact.totalBorrowed += amount;
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
    const transactions = await Transaction.find({
      user: req.user._id,
      contact: req.body.phone,
    }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createTransaction,
  getTransactionsByContact,
};
