import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import AllUserscontext from "../context/AllUserscontext";
import useConvesessionStore from "../zustand/useConvesessionStore";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const { AllUsers } = useContext(AllUserscontext);
  const selectedConversation = useConvesessionStore((state) => state.selectedConversation);
  const setSelectedConversation = useConvesessionStore((state) => state.setSelectedConversation);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = AllUsers.data.find((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0f766e] via-[#134e4a] to-[#082f49] text-white w-full h-[10vh] flex items-center px-4">
      <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
        <div className="flex-grow relative">
          <input
            type="text"
            className="w-full bg-[#0f172a] text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:text-gray-400 font-medium"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full text-xl transition"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default Search;
