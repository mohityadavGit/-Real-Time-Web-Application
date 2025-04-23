// models/Message.js

import mongoose, { Schema } from "mongoose";

// ✅ Message Schema
const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ correct spelling: required
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ createdAt & updatedAt will be auto-managed
  }
);

// ✅ Register model safely (avoids re-registering in dev environments)
const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
