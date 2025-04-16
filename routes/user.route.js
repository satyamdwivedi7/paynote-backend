const express = require("express");
const router = express.Router();
const { createUser, login, getUserInfo } = require("../controllers/user.controller");

router.post("/", createUser);
router.post("/login", login);
router.post("/info", getUserInfo);

module.exports = router;
