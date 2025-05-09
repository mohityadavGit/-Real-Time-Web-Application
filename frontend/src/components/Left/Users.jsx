import React, { useContext } from "react";
import User from "./User";
import AllUserscontext from "../context/AllUserscontext";
import Loading from "../Loading";
import Socketcontext from "../context/Socketcontext";

function Users() {
  const { AllUsers, loading, error } = useContext(AllUserscontext);
  const { onlineUsers } = useContext(Socketcontext);

  const sortedUsers = AllUsers?.data?.slice().sort((a, b) => {
    const isAOnline = onlineUsers.includes(a._id);
    const isBOnline = onlineUsers.includes(b._id);
    return isBOnline - isAOnline;
  });

  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#082f49] text-white h-full overflow-y-auto scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-gray-800 p-2">
      <h1 className="text-xl font-bold mb-4 text-center text-teal-300">
        All Conversations
      </h1>

      {loading && <Loading />}
      {error && <p className="text-red-400">Error: {error}</p>}

      <div className="space-y-2">
        {sortedUsers?.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
