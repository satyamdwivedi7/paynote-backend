const express = require("express");
const router = express.Router();
const {createTransaction, getTransactionsByContact} = require("../controllers/transaction.controller");

router.post("/create", createTransaction);
router.post("/", getTransactionsByContact);

module.exports = router;