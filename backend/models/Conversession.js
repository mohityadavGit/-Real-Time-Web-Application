import mongoose, { Schema } from "mongoose";
import User from "./User.js";
const conversessionSchema = new Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

const Conversession = mongoose.model("Conversession", conversessionSchema);

export default Conversession;
