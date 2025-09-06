const {
  placeOrder: placeOrderService,
  getOrdersByUser,
} = require("../services/orderService");
const { sendOrderConfirmationEmail } = require("../utils/mailer");

const placeOrder = async (req, res) => {
  try {
    const { userID, items, subtotal, delivery, tax, totalAmount, email } =
      req.body;

    if (!userID || !items?.length) {
      return res.status(400).json({ message: "userID and items are required" });
    }

    // Sanitize items
    const sanitizedItems = items.map((i) => ({
      itemId: Number(i.itemId) || 0,
      name: i.name || "Unknown",
      price: Number(i.price) || 0,
      quantity: Number(i.quantity) || 1,
      image: i.image || "",
    }));

    const order = await placeOrderService(
      userID,
      sanitizedItems,
      Number(totalAmount) || 0,
      Number(subtotal) || 0,
      Number(delivery) || 0,
      Number(tax) || 0
    );

    await sendOrderConfirmationEmail(email);

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("PlaceOrder Error:", err);
    res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
};
// Controller to get user orders
const getUserOrders = async (req, res) => {
  try {
    const { userID } = req.params;
    const orders = await getOrdersByUser(userID);
    res.status(200).json(orders);
  } catch (err) {
    console.error("GetUserOrders Error:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

module.exports = { placeOrder, getUserOrders };
