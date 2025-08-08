const Order = require("../models/order");

const placeOrder = async (userID, items, totalAmount) => {
    const order = new Order({ userID, items, totalAmount });
    await order.save();
    return order;
};

const getOrdersByUser = async (userID) => {
    const orders = await Order.find({ userID });
    return orders;
};

module.exports = {
    placeOrder,
    getOrdersByUser
};
