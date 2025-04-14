const express = require('express');
const router = express.Router();
const user = require("./user.route");
const contact = require("./contact.route");
const transaction = require("./transaction.route");

router.use("/user", user);
router.use("/contact", contact);
router.use("/transaction", transaction);

module.exports = router;