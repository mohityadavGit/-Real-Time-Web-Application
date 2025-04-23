import React, { useContext } from "react";
import User from "./User";
import AllUserscontext from "../context/AllUserscontext";
import Loading from "../Loading";
import Socketcontext from "../context/Socketcontext"; // ✅ add this line

function Users() {
  const { AllUsers, loading, error } = useContext(AllUserscontext);
  const { onlineUsers } = useContext(Socketcontext); // ✅ get online users

  console.log("han ji ", AllUsers);

  // ✅ sort: online users upar
  const sortedUsers = AllUsers?.data?.slice().sort((a, b) => {
    const isAOnline = onlineUsers.includes(a._id);
    const isBOnline = onlineUsers.includes(b._id);

    if (isAOnline && !isBOnline) return -1;
    if (!isAOnline && isBOnline) return 1;
    return 0;
  });

  return (
    <div className="min-h-[80vh]">
      <h1 className="font-semibold py-4 px-2">Messages</h1>

      {loading && (
        <div className="px-2">
          <Loading />
        </div>
      )}
      {error && <p className="px-2 text-red-500">Error: {error}</p>}

      {sortedUsers?.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
}

export default Users;
