import bcrypt from "bcryptjs";
//  userController.js
import User from "../models/User.js";
import generateToken from "../jwt/generateToken.js";
import mongoose from "mongoose";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup logic here", req.url, req.method, req.body);
  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check if user already exists
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user and saving pasword with hashing
    bcrypt.hash(password, 12).then((hashedpassword) => {
      const newUser = new User({ name, email, password: hashedpassword });
      newUser.save().then(() => {
        res.status(201).json({
          message: "User created successfully",
          user: {
            id: newUser._id,
            fullname: newUser.name,
            email: newUser.email,
          },
        });
      });

      const token = generateToken(newUser._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
    });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 🔍 Check if user exists by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Your email does not exist" });
    }

    // 🔐 Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // ✅ Generate JWT token
    const token = generateToken(existingUser._id);

    // 🍪 Send token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ✅ Allow on localhost (non-HTTPS)
      sameSite: "Lax", // ✅ Safer for local dev
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: existingUser._id,
        fullname: existingUser.name,
        email: existingUser.email,
      },
      token, // ✅ Add this line
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // set to false if not using HTTPS in development
    sameSite: "None", // can also be 'Lax' or 'Strict' depending on your setup
  });

  console.log("User logged out:", req.url, req.method);

  return res.status(200).json({ message: "User logged out successfully" });
};

const getAllUsers = async (req, res) => {
  // console.log("bhai ye decode vla hai ", req.user);
  try {
    const currentUserId = new mongoose.Types.ObjectId(req.user.id); // 🛠 convert to ObjectId

    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );

    return res.status(200).json({
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error occurred while fetching users:", error);
    return res.status(500).json({
      message: "Internal server error while fetching users",
    });
  }
};
// Bundle all in one object
const userController = {
  signup,
  login,
  logout,
  getAllUsers,
};

export default userController;
