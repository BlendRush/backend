const mongoose = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const menuItemSchema = new mongoose.Schema({
    itemId: {
        type: Number,
        unique: true,
    },
    name: String,
    ingredients: [String],
    price: Number,
    imageUrl: String,
});

menuItemSchema.plugin(AutoIncrement, { inc_field: "itemId" });

module.exports = mongoose.model('MenuItem', menuItemSchema);
