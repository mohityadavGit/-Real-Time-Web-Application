import React from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../context/useSendMessage.js";

function Sendmsg() {
  const { sendMessage, loading } = useSendMessage();

  const handleData = async (event) => {
    event.preventDefault();
    const message = event.target.elements.message.value.trim();

    if (!message) return;

    await sendMessage(message);
    event.target.reset();
  };

  return (
    <form
      className="bg-[#3F3351] text-white w-full h-[10vh] flex items-center justify-center px-4"
      onSubmit={handleData}
    >
      <input
        type="text"
        name="message"
        placeholder="Type a message..."
        className="flex-1 mr-4 p-3 rounded-full bg-[#1F1D36] text-[#F7F5F2] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#70E3B0]"
        disabled={loading}
      />
      <button
        type="submit"
        className="p-3 rounded-full bg-[#70E3B0] text-[#1F1D36] hover:bg-[#5ed8a0] transition duration-200 text-xl"
        disabled={loading}
      >
        <IoSend />
      </button>
    </form>
  );
}

export default Sendmsg;
