// useGetMessage.js
import { useEffect, useContext } from "react";
import axios from "axios";
import useConvesessionStore from "../zustand/useConvesessionStore.js";
import AllUserscontext from "./AllUserscontext.jsx";

const useGetMessage = () => {
  // ✅ Context se loading aur setLoading mil raha
  const { loading, setLoading } = useContext(AllUserscontext);
  const apiUrl = import.meta.env.VITE_API_URL;

  // ✅ Zustand se states nikal rahe hain
  const selectedConversation = useConvesessionStore(
    (state) => state.selectedConversation
  );
  const messages = useConvesessionStore((state) => state.messages);
  const setMessages = useConvesessionStore((state) => state.setMessages);

  // ✅ Message fetch karne ka function
  const fetchMessages = async () => {
    try {
      if (!selectedConversation) return;

      setLoading(true);

      console.log(
        "Selected Conversation in useGetMessage:",
        selectedConversation
      );
      const receiverId =
        typeof selectedConversation === "object"
          ? selectedConversation._id || selectedConversation.id
          : selectedConversation;
      console.log(receiverId, "ye hai jis id ko  maine abhi clik kiya hai ");
      const res = await axios.get(
        `${apiUrl}/get/${receiverId}`, // userId here
        {
          withCredentials: true,
        }
      );
      setMessages(res.data.data); // isme data: conversession.messages, aya hai jo get me bhej rahe hain
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ useEffect jab selectedConversation change ho
  useEffect(() => {
    fetchMessages();
  }, [selectedConversation, setMessages]);

  // ✅ Values return ho rahe hain hook se
  return {
    messages,
    fetchMessages,
    loading,
  };
};

export default useGetMessage;
