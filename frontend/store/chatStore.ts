// frontend/store/chatStore.ts
import { create } from 'zustand';
import { Conversation, Message } from '@/types';

interface ChatState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (conversation: Conversation | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  updateConversation: (conversation: Conversation) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversation: null,
  messages: [],
  isLoading: false,

  setConversations: (conversations) => set({ conversations }),
  
  setActiveConversation: (conversation) => {
    set({ activeConversation: conversation, messages: [] });
  },
  
  addMessage: (message) => {
    const { messages, activeConversation } = get();
    set({ 
      messages: [...messages, message] 
    });
    
    const { conversations } = get();
    const updatedConversations = conversations.map(conv => 
      conv.id === message.conversationId 
        ? { ...conv, lastMessage: message, updatedAt: message.createdAt }
        : conv
    );
    set({ conversations: updatedConversations });
  },
  
  setMessages: (messages) => set({ messages }),
  
  updateConversation: (conversation) => {
    const { conversations } = get();
    const updated = conversations.map(conv => 
      conv.id === conversation.id ? conversation : conv
    );
    set({ conversations: updated });
  },
}));