// services/orderService.js
const Order = require("../models/order");

// Service to place order
const placeOrder = async (userID, items, totalAmount, subtotal = 0, delivery = 0, tax = 0) => {
    const order = new Order({
        userID,
        items,
        totalAmount,
        subtotal,
        delivery,
        tax,
    });
    const savedOrder = await order.save();
    return savedOrder;
};

// Service to get orders by user
const getOrdersByUser = async (userID) => {
    const orders = await Order.find({ userID });
    return orders;
};

module.exports = {
    placeOrder,
    getOrdersByUser
};
