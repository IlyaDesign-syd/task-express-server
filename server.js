// server.js
const express = require('express');
require('dotenv').config();

const cors = require('cors');
const app = express();

const userRouter = require('./routes/users');
app.use('/users', userRouter);

// CORS setup for local development
app.use(cors({
  origin: process.env.APP_URL,
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Run app
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


// Test DB connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));