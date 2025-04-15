const express = require('express');
const router = express.Router();
const { index } = require("../controllers/contact.controller");
const checkLoggedIn = require("../middlewares/auth.middleware");

router.get("/", checkLoggedIn, index);

module.exports = router;