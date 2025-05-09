import React from "react";

function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#1a1a2e]">
      <div className="flex space-x-3">
        <span className="w-5 h-5 bg-teal-400 rounded-full animate-bounce"></span>
        <span className="w-5 h-5 bg-pink-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
        <span className="w-5 h-5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
      </div>
    </div>
  );
}

export default Loading;
