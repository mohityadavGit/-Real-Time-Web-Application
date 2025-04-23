import { create } from "zustand";

const useConvesessionStore = create((set) => ({
  // 🟡 Kis se baat ho rahi hai abhi
  selectedConversation: null,

  // 🟢 Ye function change karega kis se baat karni hai
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  // 🟡 Messages ka array
  messages: [],

  // 🟢 Ye function messages set karega
  setMessages: (msgs) => set({ messages: msgs }),
}));

export default useConvesessionStore;
