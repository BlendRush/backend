const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./src/routes/orderRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/orders', orderRoutes);


mongoose.connect(process.env.MONGODB_URI_ORDER_SERVICE)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(3002, () => {
    console.log("Order service running on port 3002");
});
