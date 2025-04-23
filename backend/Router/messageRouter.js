import express from "express";
const messageRouter = express.Router();
import verifyToken from "../midleware/verifyToken.js";
import messageController from "../Controller/messageController.js";

// Destructure & use
const { SendMessage, GetMessage } = messageController;
messageRouter.post("/send/:id", verifyToken, SendMessage);
messageRouter.get("/get/:id", verifyToken, GetMessage);

export default messageRouter;
