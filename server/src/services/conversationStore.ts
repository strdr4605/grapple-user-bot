export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const sessions = new Map<string, Message[]>();

export function getSession(sessionId: string): Message[] {
  return sessions.get(sessionId) || [];
}

export function addMessage(sessionId: string, message: Message): void {
  const history = sessions.get(sessionId) || [];
  history.push(message);
  sessions.set(sessionId, history);
}

export function clearSession(sessionId: string): void {
  sessions.delete(sessionId);
}
