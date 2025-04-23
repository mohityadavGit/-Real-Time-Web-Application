import Conversession from "../models/Conversession.js";
import Message from "../models/Message.js";
import { getReceiverSocketId, io } from "../SocketIo/server.js";
const SendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    // Check if a conversation already exists between sender and receiver
    let conversession = await Conversession.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // If no conversation, create a new one
    if (!conversession) {
      conversession = new Conversession({
        members: [senderId, receiverId],
        message: [],
      });
    }

    // Create a new message
    const newMessage = new Message({
      message,
      senderId,
      receiverId,
    });

    // Push the message ID into the conversation
    conversession.messages.push(newMessage._id);

    // Save both message and conversation
    await Promise.all([newMessage.save(), conversession.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(201).json({
      status: "success",
      msg: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("SendMessage Error:", error);
    return res.status(500).json({
      status: "error",
      msg: "Internal server error",
      error: error.message,
    });
  }
};

const GetMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    // Find conversation between sender and receiver
    const conversession = await Conversession.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversession) {
      return res.status(200).json({
        status: "success",
        msg: "No messages found between users",
        data: [],
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "Messages retrieved successfully",
      data: conversession.messages,
    });
  } catch (error) {
    console.error("Error in GetMessage:", error);
    return res.status(500).json({
      status: "error",
      msg: "Internal server error while fetching messages",
      error: error.message,
    });
  }
};

const messageController = { SendMessage, GetMessage };

export default messageController;
