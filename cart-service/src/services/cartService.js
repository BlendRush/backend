const CartItem = require("../models/cartItem");

const addItem = async ({ userId, itemId, name, image, price, quantity = 1 }) => {
  let existingItem = await CartItem.findOne({ userId, itemId });
  if (existingItem) {
    existingItem.quantity += quantity;
    await existingItem.save();
    return existingItem;
  }

  const cartItem = new CartItem({
    userId,
    itemId,
    name,
    image,
    price,
    quantity,
  });
  await cartItem.save();
  return cartItem;
};

const removeItem = async (userId, itemId) => {
  return await CartItem.findOneAndDelete({ userId, itemId });
};

const getCartItems = async (userId) => {
  return await CartItem.find({ userId });
};

const updateQuantity = async (userId, itemId, quantity) => {
  const item = await CartItem.findOne({ userId, itemId });
  if (!item) throw new Error("Item not found");
  item.quantity = quantity;
  await item.save();
  return item;
};

const clearCart = async (userId) => {
  return await CartItem.deleteMany({ userId });
};

module.exports = {
  addItem,
  removeItem,
  getCartItems,
  updateQuantity,
  clearCart
};
