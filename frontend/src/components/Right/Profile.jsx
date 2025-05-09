import React, { useContext } from "react";
import useConvesessionStore from "../zustand/useConvesessionStore";
import Socketcontext from "../context/Socketcontext";

function Profile() {
  const { Socket, onlineUsers } = useContext(Socketcontext);
  const selectedConversation = useConvesessionStore(
    (state) => state.selectedConversation
  );

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  if (!selectedConversation) {
    return (
      <div className="bg-gradient-to-br from-[#1F1D36] via-[#3F3351] to-[#FF4C98] w-full h-[15vh] flex flex-col items-center justify-center text-center shadow-inner rounded-md px-4 animate-fade-in">
        <div className="text-4xl mb-2 text-[#F7F5F2]">👤</div>
        <p className="text-lg font-semibold text-[#F7F5F2] tracking-wide">
          Please select a{" "}
          <span className="text-[#70E3B0] font-bold italic">user to chat</span>
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-[#1F1D36] via-[#3F3351] to-[#FF4C98] text-white w-full h-[15vh] flex flex-col items-center justify-center shadow-lg rounded-md px-4">
        <div className="avatar mb-2">
          <div className="w-20 rounded-full ring ring-[#70E3B0] ring-offset-2 hover:scale-105 transition-transform duration-300">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                selectedConversation.name
              )}`}
              alt="User Avatar"
            />
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-16">
        <p className="text-xl font-bold capitalize drop-shadow text-white">
          {selectedConversation.name}
        </p>
        <p className="text-sm font-medium text-[#70E3B0] animate-pulse">
          {getOnlineUsersStatus(selectedConversation._id)}
        </p>
      </div>
    </>
  );
}

export default Profile;
