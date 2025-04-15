const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const checkLoggedIn = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  token = token.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = checkLoggedIn;
