import React, { useEffect, useRef, useContext } from "react";
import Messages from "./Messages.jsx";
import Loading from "../Loading.jsx";
import Authcontext from "../context/Authcontext.jsx"; // Import Authcontext to check if the user is authenticated
import useGetMessage from "../context/useGetMessage.js";
import useGetSocketMessage from "../context/useGetSocketMessage.js";
function Messagearea() {
  const { messages, loading: messageLoading } = useGetMessage();
  const [Authuser, setAuthuser, loading, authLoading] = useContext(Authcontext); // Get loading state from Authcontext
  useGetSocketMessage(); //listining icoming messages
  const lastMsgRef = useRef(); // ✅ yeh add karna zaroori tha

  // Scroll to the latest message after each message update
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  // If the authentication is still loading, show a loading screen for authentication
  if (authLoading) {
    return <Loading />; // Show loading while checking auth
  }

  return (
    <div className="bg-slate-500 w-full min-h-[72vh] flex flex-col justify-end p-4 overflow-y-scroll scrollbar-none">
      {messageLoading ? (
        <Loading /> // Show loading while messages are being fetched
      ) : (
        messages.length > 0 &&
        messages.map((msg, index) => (
          <div key={msg._id} ref={lastMsgRef}>
            <Messages
              message={msg}
              ref={index === messages.length - 1 ? lastMsgRef : null} // ✅ ref lagaya last message pe
            />
          </div>
        ))
      )}

      {!messageLoading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center animate-fade-in">
          <div className="text-5xl mb-4 text-primary drop-shadow-lg">👋</div>
          <p className="text-xl text-white font-semibold animate-pulse">
            Say{" "}
            <span className="text-red-700 font-bold animate-bounce">Hi</span> to
            start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messagearea;
