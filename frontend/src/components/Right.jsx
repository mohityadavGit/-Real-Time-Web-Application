import React from "react";
import Profile from "./Right/Profile";
import Sendmsg from "./Right/SendMsg";
import Messagearea from "./Right/Messagearea";
function Right() {
  return (
    <div className="bg-slate-600 w-[70vw]">
      <Profile></Profile>
      <div className="max-h-[75vh] scrollbar-none  overflow-y-scroll ">
        <Messagearea></Messagearea>
      </div>

      <Sendmsg></Sendmsg>
    </div>
  );
}

export default Right;
