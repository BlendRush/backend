const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = 3003;

app.use(express.json());
app.use('/user', userRoutes);

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI_USER_SERVICE)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
