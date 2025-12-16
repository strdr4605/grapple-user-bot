import { create } from 'zustand'

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sessionId: string;
  setIsLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  appendMessage: (message: Message) => void;
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const useConversation = create<ConversationState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  sessionId: generateSessionId(),
  setIsLoading: (value) => set(() => ({ isLoading: value })),
  setError: (error) => set(() => ({ error })),
  appendMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
}))
