const express = require("express");
const router = express.Router();
const {createUser, getUserById, getAllUsers,} = require("../controllers/user.controller");

router.post("/", createUser);
router.get("/:id", getUserById);
router.get("/", getAllUsers);

module.exports = router;