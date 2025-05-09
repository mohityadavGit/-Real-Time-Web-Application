import React, { useEffect, useRef, useContext } from "react";
import Messages from "./Messages.jsx";
import Loading from "../Loading.jsx";
import Authcontext from "../context/Authcontext.jsx";
import useGetMessage from "../context/useGetMessage.js";
import useGetSocketMessage from "../context/useGetSocketMessage.js";

function Messagearea() {
  const { messages, loading: messageLoading } = useGetMessage();
  const [Authuser, setAuthuser, loading, authLoading] = useContext(Authcontext);
  useGetSocketMessage();
  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  if (authLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#1F1D36] w-full min-h-[72vh] flex flex-col justify-end p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#3F3351] scrollbar-track-[#1F1D36]">
      {messageLoading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((msg, index) => (
          <div key={msg._id} ref={lastMsgRef}>
            <Messages
              message={msg}
              ref={index === messages.length - 1 ? lastMsgRef : null}
            />
          </div>
        ))
      )}

      {!messageLoading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center animate-fade-in">
          <div className="text-6xl mb-4 text-[#FF4C98] drop-shadow-lg">👋</div>
          <p className="text-xl text-[#F7F5F2] font-semibold animate-pulse">
            Say{" "}
            <span className="text-[#70E3B0] font-bold animate-bounce">Hi</span>{" "}
            to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messagearea;
