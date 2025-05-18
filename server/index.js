import 'dotenv/config'; // Load environment variables
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/mongoDb.js";
import userRouter from "./routes/userRoutes.js"



dotenv.config(); // Initialize dotenv to use environment variables

// Initialize Express app
const app = express();
connectDB();

// Essential middleware
app.use(cors()); // Enable CORS
app.use(express.json({ limit: "1mb" })); // Limit payload size for JSON requests
app.use(express.urlencoded({ extended: true, limit: "1mb" })); // Limit payload size for URL-encoded requests

// Port configuration
const DEFAULT_PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not defined

// Root route for health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API is running",
    dbConnected: mongoose.connection.readyState === 1, // Check MongoDB connection status
  });
});



// API routes
app.use("/api/user", userRouter); // Correct path

// Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});


// Start server
try {
  app.listen(DEFAULT_PORT, () => {
    console.log(`Server is running on port ${DEFAULT_PORT}`);
    console.log(`You can access the API at http://localhost:${DEFAULT_PORT}`);
  });
} catch (error) {
  console.error("Server startup failed:", error);
  process.exit(1);
}