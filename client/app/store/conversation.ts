import { create } from 'zustand'

export const useConversation = create((set) => ({
  messages: ['Hello'],
  userInput: '',
  isUserWaiting: false,
  setUserInput: (input) => set(() => ({ userInput: input })),
  setIsUserWaiting: (value) => set(() => ({ isUserWaiting: value })),
  appendMessage: (message) => set((state) => ({ messages: state.messages.concat([message]) }))
}))
