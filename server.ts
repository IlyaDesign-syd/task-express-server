// server.js
const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();

import userRouter from "./routes/User.router";
app.use("/users", userRouter);

// CORS setup for local development
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);

// Run app
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// Test DB connection
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err: any) => console.error("❌ MongoDB connection error:", err));

// TODO Check if user.sub exists as a row in user db. Also create user DB.
