const Contact = require("../models/contact.model");

const index  = async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user._id,
      $or: [{ totalBorrowed: { $gt: 0 } }, { totalLent: { $gt: 0 } }],
    });
    const borrowed = contacts.filter((contact) => contact.totalBorrowed > 0);
    const lent = contacts.filter((contact) => contact.totalLent > 0);
    const totalBorrowed = borrowed.reduce(
      (acc, contact) => acc + contact.totalBorrowed,
      0
    );
    const totalLent = lent.reduce(
      (acc, contact) => acc + contact.totalLent,
      0
    );
    res.status(200).json({
      totalBorrowed,
      borrowed,
      totalLent,
      lent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  index
};
