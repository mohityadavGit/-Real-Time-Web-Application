import React, { useEffect, useState } from "react";
import { useContext } from "react";
import io from "socket.io-client";

import Socketcontext from "./Socketcontext";
import Authcontext from "./Authcontext";

function Socketprovider({ children }) {
  const [Socket, setSocket] = useState(null);
  const [Authuser] = useContext(Authcontext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    console.log("Attempting to connect to socket...");
    console.log("Authuser: ", Authuser);

    if (Authuser && Authuser.id) {
      const socket = io("http://localhost:3001", {
        query: { userId: Authuser.id }, // ✅ correct structure
      });

      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (Socket) {
        Socket.close();
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
