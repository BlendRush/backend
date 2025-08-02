const cloudinary = require("../utils/cloudinary");
const MenuItem = require("../models/menuItem"); // Assuming you have a MenuItem model defined
const fs = require("fs");

const uploadMenuItem = async (filePath, name, ingredients, price) => {
    const result = await cloudinary.uploader.upload(filePath, {
        folder: "menu-items"
    });

    const menuItem = new MenuItem({
        name,
        ingredients: ingredients.split(","), // Example: "Mango,Milk,Honey"
        price,
        image: result.secure_url
    });

    await menuItem.save();

    fs.unlinkSync(filePath); // remove local file
    return menuItem;
};
const getAllMenuItems = async () => {
    const menuItems = await MenuItem.find().sort({ itemId: 1 });
    return menuItems;
};

module.exports = {
    uploadMenuItem,
    getAllMenuItems
};
