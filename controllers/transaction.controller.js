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
          contact.totalBorrowed -= amount; 
        } else {
          contact.totalLent += amount - contact.totalBorrowed; 
          contact.totalBorrowed = 0; 
        }
      } else if (type === "borrowed") {
        if (contact.totalLent >= amount) {
          contact.totalLent -= amount; 
        } else {
          contact.totalBorrowed += amount - contact.totalLent; 
          contact.totalLent = 0; 
        }
      }
      contact = await contact.save();
    }
    const transaction = new Transaction({
      user: req.user._id,
      contact: contact._id,
      amount,
      type,
      note: note || "Unknown",
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
      .populate("contact", ["name", "phone"]); 

    res.json(transactions); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const editTransaction = async (req, res) => {
  const { transactionId, amount, type, note } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId).populate(
      "contact"
    );
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    const contact = transaction.contact;
    if (!contact) {
      return res.status(404).json({ error: "Associated contact not found" });
    }
    if (transaction.type === "lent") {
      contact.totalLent -= transaction.amount;
    } else if (transaction.type === "borrowed") {
      contact.totalBorrowed -= transaction.amount;
    }
    if (type === "lent") {
      contact.totalLent += amount;
    } else if (type === "borrowed") {
      contact.totalBorrowed += amount;
    }
    await contact.save();
    transaction.amount = amount;
    transaction.type = type;
    transaction.note = note || "Unknown";
    await transaction.save();
    res
      .status(200)
      .json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId).populate(
      "contact"
    );
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    const contact = transaction.contact;
    if (!contact) {
      return res.status(404).json({ error: "Associated contact not found" });
    }
    if (transaction.type === "lent") {
      contact.totalLent -= transaction.amount;
    } else if (transaction.type === "borrowed") {
      contact.totalBorrowed -= transaction.amount;
    }
    await contact.save();
    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactionsByContact,
  getTransactionByUser,
  editTransaction,
  deleteTransaction,
};
