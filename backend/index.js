import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./Router/userRouter.js";
import messageRouter from "./Router/messageRouter.js";
import { app, server } from "./SocketIo/server.js"; // Import socket server (if in separate file)

// Load environment variables
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGODB_URI;

// Add CORS and cookie-parser middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://real-time-web-application-pppx.vercel.app",
  "https://real-time-web-application-ijjy.vercel.app",
];

// Enable CORS for Express API routes
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Enable cookies in cross-origin requests
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON data
app.use(express.json());

// Use user and message routers for API routes
app.use(userRouter);
app.use(messageRouter);

// Test route to verify API and DB
app.get("/", (req, res) => {
  res.json({
    message: "API is working",
    db: MONGO_URI,
    info: "System is up and running",
  });
});

// Connect to MongoDB and start server (only call listen here)
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Now start the server
    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
