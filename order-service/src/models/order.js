const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        default: uuidv4,
        unique: true
    },
    userID: String,
    items: [
        {
            itemId: Number,
            quantity: Number
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
