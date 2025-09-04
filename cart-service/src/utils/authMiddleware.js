const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log("Cart service ACCESS_TOKEN:", process.env.ACCESS_TOKEN);

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log("Decoded token payload:", decoded);

    req.user = { id: decoded.userId || decoded.userID }; 
    console.log("req.user set to:", req.user);

    next();
  } catch (err) {
    console.log("JWT verification error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
