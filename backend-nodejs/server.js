import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
// import { verifyToken } from "./middleware/authMiddleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
// Public Routes (No token needed)
app.use("/api/auth", authRoutes);
// Protected Routes (Token REQUIRED for all routes in this file)
// app.use("/api/user", verifyToken, userRoutes);
//OR verifyToken can be applied at specific route inside userRoutes.js
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await initDB(); // Initialize table
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
