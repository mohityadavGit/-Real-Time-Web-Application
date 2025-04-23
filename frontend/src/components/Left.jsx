import React from "react";
import Search from "./Left/Search";
import Users from "./Left/Users";
import Logout from "./Left/Logout";
function Left() {
  return (
    <div className="bg-black text-white w-[30vw]">
      <Search></Search>
      <hr />
      <div className="max-h-[80vh] scrollbar-none  overflow-y-scroll ">
        <Users></Users>
      </div>
      <hr />
      <Logout></Logout>
    </div>
  );
}

export default Left;
