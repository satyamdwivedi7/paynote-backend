const express = require("express");
const router = express.Router();
const {createTransaction, getTransactionsByContact} = require("../controllers/transaction.controller");
const checkLoggedIn = require("../middlewares/auth.middleware");

router.post("/create", checkLoggedIn ,createTransaction);
router.post("/", checkLoggedIn, getTransactionsByContact);

module.exports = router;