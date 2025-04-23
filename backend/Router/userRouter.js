// 🔹 userRouter.js

import express from "express";
import verifyToken from "../midleware/verifyToken.js";
import userController from "../Controller/userController.js";

const userRouter = express.Router();

// Destructure & use
const { signup, login, logout, getAllUsers } = userController;

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

// ✅ Protected route for frontend auth check
userRouter.get("/auth/check", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user, message: "Token valid" });
});

userRouter.get("/getAllUsers", verifyToken, getAllUsers);

export default userRouter;
