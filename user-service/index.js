const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/googleAuth');
const passport = require("passport");
const session = require("express-session");
require('dotenv').config();

const app = express();
const PORT = 3003;

app.use(express.json());

app.use(
  session({
    secret: "xzcbnxncdhvbfhncxbnvbcfhv",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/user', userRoutes);
app.use("/auth", authRoutes);

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI_USER_SERVICE)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
