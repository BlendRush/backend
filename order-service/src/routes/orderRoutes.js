const express = require("express");
const { placeOrder, getUserOrders } = require("../controllers/orderController");
//const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/placeOrder", placeOrder);
router.get("/getUserOrders/:userID", getUserOrders);

module.exports = router;
