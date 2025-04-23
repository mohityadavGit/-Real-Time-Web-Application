import React, { useContext } from "react";
import image from "/image.png";
import useConvesessionStore from "../zustand/useConvesessionStore";
import Socketcontext from "../context/Socketcontext";

function Profile() {
  const { Socket, onlineUsers } = useContext(Socketcontext);
  const selectedConversation = useConvesessionStore(
    (state) => state.selectedConversation
  );

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline"; // ✅ fixed spelling
  };

  console.log("is user ko dikhana hai bhai", selectedConversation);

  // 🔄 Fallback UI when no conversation is selected
  if (!selectedConversation) {
    return (
      <div className="bg-gradient-to-br from-[#3b0764] via-[#9333ea] to-[#f43f5e] w-full h-[15vh] flex flex-col items-center justify-center text-center shadow-inner rounded-md px-4 animate-fade-in">
        <div className="text-4xl mb-2 text-pink-100">👤</div>
        <p className="text-xl font-semibold text-white tracking-wide">
          Please select a{" "}
          <span className="text-pink-200 font-bold italic">user to chat</span>{" "}
          and start the conversation.
        </p>
      </div>
    );
  }

  // ✅ UI when a conversation is selected
  return (
    <>
      <div className="bg-gradient-to-r from-[#4c1d95] via-[#7e22ce] to-[#db2777] text-white w-full h-[15vh] flex flex-col items-center justify-center shadow-lg rounded-md px-4 transition-all duration-500 ease-in-out">
        <div className="avatar mb-2">
          <div className="w-20 rounded-full ring ring-white ring-offset-2 ring-offset-pink-300 shadow-xl hover:scale-105 transition-transform duration-300 mt-2">
            <img src={image} alt="User Avatar" />
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-16">
        <p className="text-xl font-bold tracking-wide capitalize drop-shadow-sm text-white">
          {selectedConversation.name}
        </p>
        <p className="text-sm font-medium text-green-300 animate-pulse">
          {getOnlineUsersStatus(selectedConversation._id)}{" "}
          {/* or .id depending on your data */}
        </p>
      </div>
    </>
  );
}

export default Profile;
