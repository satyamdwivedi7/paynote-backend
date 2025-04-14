const express = require("express");
const router = express.Router();
const {createTransaction, getTransactionsByUser, updateTransaction, deleteTransaction} = require("../controllers/transaction.controller");

router.post("/", createTransaction);
router.get("/:userId", getTransactionsByUser);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;