const express = require('express');
const mongoose = require('mongoose');
const cartRoutes = require('./src/routes/cartRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/cart-items', cartRoutes);


mongoose.connect(process.env.MONGODB_URI_CART_SERVICE)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(3005, () => {
    console.log("Cart service running on port 3005");
});
