import React, { useContext } from "react";
import useConvesessionStore from "../zustand/useConvesessionStore";
import Socketcontext from "../context/Socketcontext";

function User({ user }) {
  const { Socket, onlineUsers } = useContext(Socketcontext);
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
      className={`transition-colors duration-300 cursor-pointer rounded-md p-2 
        ${isSelected ? "bg-slate-800" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className={`avatar`}>
          <div
            className={`w-16 rounded-full ring ${
              isOnline ? "ring-green-400" : "ring-gray-400"
            } ring-offset-base-100 ring-offset-2`}
          >
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="font-semibold text-lg text-gray-200 hover:text-green-500">
            {user.name}
          </h1>
          <span className="text-gray-400 text-sm block">{user.email}</span>
          <span
            className={`text-xs font-medium ${
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
