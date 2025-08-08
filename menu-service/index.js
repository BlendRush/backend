const express = require('express');
const mongoose = require('mongoose');
const menuRoutes = require('./src/routes/menuRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/menu-items', menuRoutes);

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(3001, () => {
    console.log("Menu service running on port 3001");
});
