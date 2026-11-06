import type { UIMessage } from "ai";

/** Most questions a visitor can ask in one conversation before starting over. */
export const MAX_USER_MESSAGES = 20;
/** Longest single question, in characters. */
export const MAX_MESSAGE_CHARS = 1500;

export type ConversationCheck = { ok: true; messages: UIMessage[] } | { ok: false; message: string };

function textOf(message: UIMessage) {
  return (message.parts ?? [])
    .map((part: any) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim();
}

export function countUserMessages(messages: UIMessage[]) {
  return messages.filter((m) => m.role === "user").length;
}

/** Validates the conversation a browser sends before any of it reaches the model. */
export function checkConversation(input: unknown): ConversationCheck {
  if (!Array.isArray(input) || input.length === 0) {
    return { ok: false, message: "Please type a question first." };
  }
  for (const raw of input) {
    const m = raw as Partial<UIMessage> | null;
    if (!m || typeof m.id !== "string" || !Array.isArray(m.parts)) {
      return { ok: false, message: "That message couldn't be read. Start a new conversation and try again." };
    }
    if (m.role !== "user" && m.role !== "assistant") {
      return { ok: false, message: "That message couldn't be read. Start a new conversation and try again." };
    }
  }
  const messages = input as UIMessage[];
  if (countUserMessages(messages) > MAX_USER_MESSAGES) {
    return {
      ok: false,
      message: "This conversation has reached its limit. Start a new one, or book a free scoping call for detail.",
    };
  }
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user" || textOf(last).length === 0) {
    return { ok: false, message: "Please type a question first." };
  }
  if (messages.some((m) => m.role === "user" && textOf(m).length > MAX_MESSAGE_CHARS)) {
    return { ok: false, message: `Please keep each question under ${MAX_MESSAGE_CHARS} characters.` };
  }
  return { ok: true, messages };
}
