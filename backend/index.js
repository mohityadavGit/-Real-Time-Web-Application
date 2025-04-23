import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Router/userRouter.js";
import messageRouter from "./Router/messageRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIo/server.js"; // Import app and server

// Load env variables
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGODB_URI;

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies
  })
);

app.use(express.urlencoded({ extended: true }));

// Routes
app.use(userRouter);
app.use(messageRouter);

// Test route to verify API and DB
app.get("/", (req, res) => {
  res.json({
    message: "API is working",
    db: MONGO_URI,
    info: "System is up and running", // Adjust test info as necessary
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
