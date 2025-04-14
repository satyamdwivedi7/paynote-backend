const Contact = require("../models/contact.model");

const index  = async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user._id,
      $or: [{ totalBorrowed: { $gt: 0 } }, { totalLent: { $gt: 0 } }],
    });
    const borrowers = contacts.filter((contact) => contact.totalBorrowed > 0);
    const lenders = contacts.filter((contact) => contact.totalLent > 0);
    res.status(200).json({
      borrowers,
      lenders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  index
};
