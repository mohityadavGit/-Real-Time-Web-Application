import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173", // Localhost
        "https://real-time-web-application-pppx.vercel.app", // First deployed app
        "https://real-time-web-application-ijjy.vercel.app", // Second deployed app (new addition)
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Accept request
      } else {
        callback(new Error("Not allowed by CORS")); // Reject request
      }
    },
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies)
  },
});

// Add user connection handling (already present in your code)
const users = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Connected users: ", users);
  }

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
