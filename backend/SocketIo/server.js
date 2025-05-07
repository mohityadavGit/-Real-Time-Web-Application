import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, // Using CLIENT_URL from .env
    methods: ["GET", "POST"],
    credentials: true, // Allows cookies and authorization headers
  },
});

// Realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

// Used to listen for events on the server side.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Connected users: ", users);
  }

  // Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(users));

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
