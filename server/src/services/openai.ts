import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import OpenAI from "openai";
import { getDealContext } from "./pipedrive";
import { getSession, addMessage, Message } from "./conversationStore";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const SYSTEM_PROMPT = `You are a professional legal assistant specializing in employment law.
You help users understand case details, summarize legal situations, and provide guidance.
Be concise, professional, and reference specific case details when relevant.`;

let caseContext: string | null = null;

async function getCaseContext(): Promise<string> {
  if (!caseContext) {
    const data = await getDealContext();
    caseContext = typeof data === "string" ? data : String(data ?? "");
  }
  return caseContext;
}

export async function chat(sessionId: string, userMessage: string) {
  const context = await getCaseContext();

  // Add user message to history
  addMessage(sessionId, { role: "user", content: userMessage });

  // Build messages array with system prompt + case context + history
  const history = getSession(sessionId);
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `${SYSTEM_PROMPT}\n\nCase context from CRM:\n${context}`,
    },
    ...history.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
  ];

  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages,
  });

  const assistantMessage = completion.choices[0].message.content || "";

  // Add assistant response to history
  addMessage(sessionId, { role: "assistant", content: assistantMessage });

  return {
    response: assistantMessage,
    sessionId,
  };
}
