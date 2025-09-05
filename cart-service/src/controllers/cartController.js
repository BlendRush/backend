const cartService = require("../services/cartService");

const addItemController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, name, image, price, quantity } = req.body;
    if (!itemId) return res.status(400).json({ message: "itemId is required" });

    const newItem = await cartService.addItem({ userId, itemId, name, image, price, quantity });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeItemController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const removedItem = await cartService.removeItem(userId, itemId);
    if (!removedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item removed", removedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartItemsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await cartService.getCartItems(userId);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuantityController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;
    const updatedItem = await cartService.updateQuantity(userId, itemId, quantity);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearCartController = async (req, res) => {
  try {
    const userId = req.user.id;
    await cartService.clearCart(userId);
    res.status(200).json({ message: "All items deleted from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addItemController,
  removeItemController,
  getCartItemsController,
  updateQuantityController,
  clearCartController
};
