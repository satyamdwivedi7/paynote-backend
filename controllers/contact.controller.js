const Contact = require("../models/contact.model");

const createContact = async (req, res) => {
  try {
    const { username, name, phone } = req.body;
    const contact = await Contact.create({ username, name, phone });
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getContactsByUser = async (req, res) => {
  try {
    const contacts = await Contact.find({ username: req.params.id });
    res.json(contacts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Contact not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createContact,
  getContactsByUser,
  updateContact,
  deleteContact,
};
