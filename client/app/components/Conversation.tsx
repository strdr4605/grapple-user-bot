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

function formatTime(date: Date) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }) + ', ' + date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
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

  const now = formatTime(new Date());

  return (
    <section className="flex flex-col h-[calc(100vh-64px)]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full">
        <div className="space-y-8">
          {/* Initial assistant greeting */}
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="max-w-2xl">
                <p className="text-gray-800 leading-relaxed">
                  Hello! I&apos;m your legal assistant. I have access to your case details and I&apos;m here to help you understand your situation and answer any questions you may have. What would you like to know?
                </p>
              </div>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx}>
              {msg.role === 'user' ? (
                /* User message - right aligned, dark background */
                <div className="flex justify-end">
                  <div className="max-w-md">
                    <div className="bg-gray-800 text-white px-4 py-3 rounded-2xl">
                      {msg.content}
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-2 text-gray-400 text-sm">
                      <span>{now}</span>
                      <button className="hover:text-gray-600" title="Copy">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2"/>
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Assistant message - left aligned, no background */
                <div className="flex justify-start">
                  <div className="max-w-2xl">
                    <p className="text-gray-800 leading-relaxed">
                      {msg.content}
                    </p>
                    <div className="flex items-center justify-end gap-2 mt-2 text-gray-400 text-sm">
                      <span>{now}</span>
                      <button className="hover:text-gray-600" title="Copy">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2"/>
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="text-gray-500 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Input area - fixed at bottom */}
      <div className="border-t border-gray-100 bg-white px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <Input onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </section>
  )
}
