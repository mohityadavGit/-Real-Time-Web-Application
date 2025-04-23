import React from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../context/useSendMessage.js"; // ✅ import your custom hook

function Sendmsg() {
  const { sendMessage, loading } = useSendMessage(); // ✅ hook se function mil gaya

  const handleData = async (event) => {
    event.preventDefault();
    const message = event.target.elements.message.value.trim();

    if (!message) return;

    await sendMessage(message); // ✅ message send kar diya

    event.target.reset(); // ✅ input field clear kar diya
  };

  return (
    <div>
      <form
        className="bg-slate-900 text-white w-full h-[10vh] flex items-center justify-center"
        onSubmit={handleData}
      >
        <input
          type="text"
          name="message"
          placeholder="Send Message"
          className="ml-4 input input-accent font-semibold w-[45vw] rounded-full bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={loading} // ✅ disable input while loading
        />
        <button
          type="submit"
          className="p-2 rounded-full hover:bg-gray-600 transition duration-200 space-x-3 text-2xl text-green-500 ml-3"
          disabled={loading} // ✅ disable button while sending
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
}

export default Sendmsg;
