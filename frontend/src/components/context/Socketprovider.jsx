import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

import Socketcontext from "./Socketcontext";
import Authcontext from "./Authcontext";

function Socketprovider({ children }) {
  const [Socket, setSocket] = useState(null);
  const [Authuser] = useContext(Authcontext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (Authuser && Authuser.id) {
      console.log("Attempting to connect to socket with user:", Authuser.id);

      const socket = io(apiUrl, {
        query: { userId: Authuser.id },
        withCredentials: true, // optionally needed
      });

      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
      });

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      setSocket(socket);

      return () => {
        socket.disconnect(); // better than .close() in socket.io
        setSocket(null);
      };
    } else {
      if (Socket) {
        Socket.disconnect();
        setSocket(null);
      }
    }
  }, [Authuser]);

  return (
    <Socketcontext.Provider value={{ Socket, onlineUsers }}>
      {children}
    </Socketcontext.Provider>
  );
}

export default Socketprovider;
