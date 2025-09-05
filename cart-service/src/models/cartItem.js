const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  itemId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
}, {
  timestamps: true,
});
cartItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model("CartItem", cartItemSchema);
