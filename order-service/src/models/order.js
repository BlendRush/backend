// models/order.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema(
    {
        orderID: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        userID: {
            type: String,
            required: true,
        },
        items: [
            {
                itemId: Number,
                name: String,
                price: Number,
                image: String,
                quantity: Number,
            },
        ],
        subtotal: { type: Number },
        delivery: { type: Number },
        tax: { type: Number },
        totalAmount: { type: Number },
        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
