const Order = require("../models/order");
const { sendOrderSuccessEmail } = require("../utils/mailer");

const placeOrder = async (req, res) => {
  try {
    const { userID, items, totalAmount, email } = req.body;
    const order = new Order({ userID, items, totalAmount });
    await order.save();

    await sendOrderSuccessEmail(email, order);

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to place order",
      error: err.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userID } = req.params;
    const orders = await Order.find({ userID });
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

module.exports = { placeOrder, getUserOrders };
