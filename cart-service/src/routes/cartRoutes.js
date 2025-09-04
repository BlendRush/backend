const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../utils/authMiddleware");

router.post("/", authMiddleware, cartController.addItemController);
router.get("/", authMiddleware, cartController.getCartItemsController);
router.delete("/:itemId", authMiddleware, cartController.removeItemController);
router.put("/:itemId", authMiddleware, cartController.updateQuantityController);
router.delete("/", authMiddleware, cartController.clearCartController);

module.exports = router;
