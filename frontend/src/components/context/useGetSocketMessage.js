import React, { useEffect, useContext } from "react";
import Socketcontext from "./Socketcontext";
import useConvesessionStore from "../zustand/useConvesessionStore";
import sound from "../../assets/sound.mp3";
function useGetSocketMessage() {
  const { Socket } = useContext(Socketcontext);

  const setMessages = useConvesessionStore((state) => state.setMessages);
  const selectedConversation = useConvesessionStore(
    (state) => state.selectedConversation
  );
  const messages = useConvesessionStore((state) => state.messages);

  useEffect(() => {
    if (!Socket) return;

    Socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessages([...messages, newMessage]);
    });

    return () => {
      Socket.off("newMessage");
    };
  }, [Socket, messages, setMessages]);

  return null;
}

export default useGetSocketMessage;
