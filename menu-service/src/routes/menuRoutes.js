const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { uploadMenuItemController, getAllMenuItemsController } = require("../controllers/menuController");

// Multer configuration
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadMenuItemController);
router.get("/", getAllMenuItemsController);

module.exports = router;
