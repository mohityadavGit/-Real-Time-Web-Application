import React from "react";

function Messages({ message }) {
  const AuthUser = JSON.parse(localStorage.getItem("LoginUserData"));

  const itsMe = message.senderId === AuthUser.user.id;
  const chatAlignment = itsMe ? "chat-end" : "chat-start";
  const bubbleColor = itsMe
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-black";
  const flexPosition = itsMe ? "justify-end" : "justify-start";
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={`flex items-center ${flexPosition} mb-4`}>
      {/* Sender Avatar (only if it's not me) */}
      {!itsMe && (
        <div className="avatar mr-2">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="sender-avatar"
            />
          </div>
        </div>
      )}

      {/* Message Bubble */}
      <div className={`chat ${chatAlignment}`}>
        <div
          className={`chat-bubble ${bubbleColor} break-words whitespace-pre-wrap max-w-xs sm:max-w-md md:max-w-lg`}
        >
          {message.message}
          <div className="chat-footter text-black">{formattedTime}</div>
        </div>
      </div>

      {/* My Avatar (only if it's me) */}
      {itsMe && (
        <div className="avatar ml-2">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="my-avatar"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
