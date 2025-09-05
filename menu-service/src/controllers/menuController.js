const { uploadMenuItem, getAllMenuItems } = require("../services/menuService");

const uploadMenuItemController = async (req, res) => {
  try {
    const { name, ingredients, price, kcal, category, tags } = req.body;
    const filePath = req.file.path;

    const menuItem = await uploadMenuItem(
      filePath,
      name,
      ingredients,
      price,
      kcal,
      category,
      tags
    );
    res.status(200).json({ message: "Menu item uploaded", menuItem });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

const getAllMenuItemsController = async (req, res) => {
  try {
    const menuItems = await getAllMenuItems();
    res.status(200).json({ success: true, data: menuItems });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch menu items", error: err.message });
  }
};

module.exports = {
  uploadMenuItemController,
  getAllMenuItemsController,
};
