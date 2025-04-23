import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AllUserscontext from "../context/AllUserscontext";
import useConvesessionStore from "../zustand/useConvesessionStore";
import { useContext } from "react";
import toast from "react-hot-toast";
function Search() {
  const [search, setSearch] = useState("");
  const { AllUsers, loading, error } = useContext(AllUserscontext);
  console.log("AllUsers", AllUsers);

  const selectedConversation = useConvesessionStore(
    (state) => state.selectedConversation
  );
  const setSelectedConversation = useConvesessionStore(
    (state) => state.setSelectedConversation
  );
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
    <div className="bg-black text-white w-full h-[10vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center justify-center"
      >
        <div className="flex items-center gap-2 w-full py-4 px-2">
          <label className=" border-[1px] ml-2 input  border-gray-700 flex items-center gap-2 ">
            <input
              type="text"
              className="grow font-bold focus:outline-none"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button className="bg-slate-600 p-2 rounded-full hover:bg-black transition duration-200 space-x-3 text-2xl text-green-500">
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
