import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/User.router";
import projectRouter from "./routes/Project.router";

const app = express();

// DB connection
mongoose
  .connect(process.env.MONGODB_URI!, {
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log(`✅ MongoDB connected to ${process.env.DB_NAME}`))
  .catch((err: any) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());
app.use("/users", userRouter);
app.use("/projects", projectRouter);

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


