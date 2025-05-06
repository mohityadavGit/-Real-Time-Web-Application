// useSendMessage.js
import { useContext } from "react";
import axios from "axios";
import useConvesessionStore from "../zustand/useConvesessionStore.js";
import AllUserscontext from "./AllUserscontext.jsx";

const useSendMessage = () => {
  // ✅ Context se loading aur setLoading mil raha
  const { loading, setLoading } = useContext(AllUserscontext);
  const apiUrl = import.meta.env.VITE_API_URL;

  // ✅ Zustand se states nikal rahe hain
  const selectedConversation = useConvesessionStore(
    (state) => state.selectedConversation
  );
  const messages = useConvesessionStore((state) => state.messages);
  const setMessages = useConvesessionStore((state) => state.setMessages);

  // ✅ Message send karne ka function
  const sendMessage = async (messageContent) => {
    try {
      if (!selectedConversation || !messageContent.trim()) return;

      setLoading(true);

      const receiverId =
        typeof selectedConversation === "object"
          ? selectedConversation._id || selectedConversation.id
          : selectedConversation;

      const res = await axios.post(
        `${apiUrl}/send/${receiverId}`, // ✅ yeh tera endpoint
        {
          message: messageContent,
        },
        {
          withCredentials: true,
        }
      );

      // ✅ Message local state mein add kar do
      const newMessage = res.data.data;
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Hook se function aur loading return karo
  return {
    sendMessage,
    loading,
  };
};

export default useSendMessage;
