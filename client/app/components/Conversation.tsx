'use client';

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useConversation } from "../store/conversation";
import { Input } from './Input'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api/v1/';

interface ChatResponse {
  response: string;
  sessionId: string;
}

export function Conversation() {
  const messages = useConversation(state => state.messages);
  const appendMessage = useConversation(state => state.appendMessage);
  const isLoading = useConversation(state => state.isLoading);
  const setIsLoading = useConversation(state => state.setIsLoading);
  const error = useConversation(state => state.error);
  const setError = useConversation(state => state.setError);
  const sessionId = useConversation(state => state.sessionId);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await axios.post<ChatResponse>(API + 'chat', {
        message,
        sessionId,
      });
      return res.data;
    },
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      appendMessage({ role: 'assistant', content: data.response });
      setIsLoading(false);
    },
    onError: () => {
      setError('Failed to get response. Please try again.');
      setIsLoading(false);
    },
  });

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    appendMessage({ role: 'user', content: message });
    chatMutation.mutate(message);
  };

  return (
    <section className="flex flex-col h-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Legal Assistant</h2>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.length === 0 && (
          <p className="text-gray-500">Ask me anything about your case...</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg ${msg.role === 'user'
              ? 'bg-blue-100 ml-8'
              : 'bg-gray-100 mr-8'
              }`}
          >
            <span className="text-xs text-gray-500 block mb-1">
              {msg.role === 'user' ? 'You' : 'Assistant'}
            </span>
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 mr-8 p-3 rounded-lg animate-pulse">
            Thinking...
          </div>
        )}
        {error && (
          <div className="bg-red-100 p-3 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>

      <Input onSend={handleSendMessage} disabled={isLoading} />
    </section>
  )
}
