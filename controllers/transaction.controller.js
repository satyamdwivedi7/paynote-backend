const Transaction = require("../models/transaction.model");

const createTransaction = async (req, res) => {
  try {
    const {
      user,
      contactName,
      contactPhone,
      amount,
      type,
      note,
      date,
      isSettled,
    } = req.body;
    const transaction = await Transaction.create({
      user,
      contactName,
      contactPhone,
      amount,
      type,
      note,
      date,
      isSettled,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTransactionsByUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.params.userId,
    }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: "Transaction not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Transaction not found" });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
};
