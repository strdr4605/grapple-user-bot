'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useConversation } from "../store/conversation";
import { useEffect } from "react";
import { Input } from './Input'

const API = 'http://localhost:3002/api/v1/';

export function Conversation() {
  const messages = useConversation(state => state.messages);
  const appendMessage = useConversation(state => state.appendMessage);
  const isUserWaiting = useConversation(state => state.isUserWaiting);
  const userInput = useConversation(state => state.userInput);

  // Queries
  const query = useQuery({
    queryKey: ['user-context'], queryFn: () => {
      return axios.get(API + 'init-conversation', {
        params: {
          input: userInput
        }
      })
    },
    enabled: isUserWaiting
  })

  useEffect(() => {
    appendMessage(query.data?.data.response)
  }, [query.data])

  console.log("query.data: ", query.data);
  return (
    <section><h2>Conversation</h2>
      <ul>
        {messages.map(message => <li key={message}>{message}</li>)}
      </ul>
      <hr />
      {query.isFetching ? <h4>Processing the request</h4> : null}
      <Input />
    </section>
  )
}
