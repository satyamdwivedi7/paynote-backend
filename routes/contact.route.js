const express = require('express');
const router = express.Router();
const {createContact, getContactsByUser, updateContact, deleteContact} = require("../controllers/contact.controller");

router.post("/", createContact);
router.get("/:id", getContactsByUser);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;