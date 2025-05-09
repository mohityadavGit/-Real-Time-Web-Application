import React from "react";

function Messages({ message }) {
  console.log(message, "mai ye dekh raha hun kon koh se details hai mere paas");
  const AuthUser = JSON.parse(localStorage.getItem("LoginUserData"));

  const itsMe = message.senderId === AuthUser.user.id;
  const chatAlignment = itsMe ? "chat-end" : "chat-start";
  const bubbleStyle = itsMe
    ? "bg-[#FF4C98] text-white"
    : "bg-[#3F3351] text-[#F7F5F2]";
  const flexPosition = itsMe ? "justify-end" : "justify-start";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // ✅ Universal symbols for clarity
  const sender = `🧑‍💬 ${message.senderName || "Sender love"}`;
  const receiver = `📥 ${AuthUser.user.name || "Receiver love"}`;

  // ✅ Avatar URLs using symbolic labels
  const recieverAvatar = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(
    receiver
  )}`;
  const myAvatar = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(
    sender
  )}`;

  return (
    <div className={`flex items-center ${flexPosition} mb-4`}>
      {!itsMe && (
        <div className="avatar mr-2">
          <div className="w-10 rounded-full ring ring-[#70E3B0] ring-offset-2">
            <img src={recieverAvatar} alt="sender-avatar" />
          </div>
        </div>
      )}

      <div className={`chat ${chatAlignment}`}>
        <div
          className={`chat-bubble ${bubbleStyle} break-words whitespace-pre-wrap max-w-xs sm:max-w-md md:max-w-lg p-3 rounded-xl shadow-lg`}
        >
          {message.message}
          <div className="text-sm text-right mt-2 text-gray-300">
            {formattedTime}
          </div>
        </div>
      </div>

      {itsMe && (
        <div className="avatar ml-2">
          <div className="w-10 rounded-full ring ring-[#70E3B0] ring-offset-2">
            <img src={myAvatar} alt="my-avatar" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
