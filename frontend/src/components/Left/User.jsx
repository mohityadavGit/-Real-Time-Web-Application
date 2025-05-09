import React, { useContext } from "react";
import useConvesessionStore from "../zustand/useConvesessionStore";
import Socketcontext from "../context/Socketcontext";

function User({ user }) {
  const { onlineUsers } = useContext(Socketcontext);
  const isOnline = onlineUsers.includes(user._id);

  const setSelectedConversation = useConvesessionStore(
    (state) => state.setSelectedConversation
  );
  const selectedConversation = useConvesessionStore(
    (state) => state.selectedConversation
  );

  const isSelected = selectedConversation?._id === user._id;

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`p-3 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#0f766e] ${
        isSelected ? "bg-[#134e4a]" : "bg-[#1e293b]"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div
            className={`w-12 rounded-full ring ${
              isOnline ? "ring-green-400" : "ring-gray-500"
            } ring-offset-2`}
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                user.name
              )}`}
              alt="User Avatar"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-medium">{user.name}</span>
          <span className="text-gray-400 text-xs">{user.email}</span>
          <span
            className={`text-xs font-semibold ${
              isOnline ? "text-green-400" : "text-gray-500"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default User;
