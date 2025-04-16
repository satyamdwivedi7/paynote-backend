const express = require("express");
const router = express.Router();
const {createTransaction, getTransactionsByContact, getTransactionByUser} = require("../controllers/transaction.controller");
const checkLoggedIn = require("../middlewares/auth.middleware");

router.post("/create", checkLoggedIn ,createTransaction);
router.post("/", checkLoggedIn, getTransactionsByContact);
router.get("/all", checkLoggedIn, getTransactionByUser);

module.exports = router;