import React from "react";

function Loding() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex space-x-2">
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
      </div>
    </div>
  );
}

export default Loding;
