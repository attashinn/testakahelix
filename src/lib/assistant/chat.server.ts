import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

import { checkConversation } from "./limits";
import { buildAssistantPrompt } from "./prompt";

function statusOf(error: unknown): number | undefined {
  let current: unknown = error;
  for (let i = 0; i < 4 && current && typeof current === "object"; i++) {
    const status = (current as { statusCode?: unknown }).statusCode;
    if (typeof status === "number") return status;
    current = (current as { cause?: unknown }).cause;
  }
  return undefined;
}

/** What a visitor sees when the assistant can't answer. */
function describeError(error: unknown) {
  const status = statusOf(error);
  console.error("Assistant error", status, error);
  if (status === 429) return "The assistant is busy right now. Please try again in a minute.";
  if (status === 402 || status === 403)
    return "The assistant is unavailable at the moment. Please email us or book a free scoping call instead.";
  return "Something went wrong while answering. Please try again, or email us directly.";
}

export async function handleAssistantChat(request: Request) {
  const apiKey =
    process.env["OPENAI_API_KEY"] ||
    process.env["OPENROUTER_API_KEY"] ||
    process.env["AI_GATEWAY_API_KEY"];

  if (!apiKey) {
    return Response.json({ error: "The assistant isn't set up yet." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "That message couldn't be read." }, { status: 400 });
  }

  const check = checkConversation((body as { messages?: unknown } | null)?.messages);
  if (!check.ok) return Response.json({ error: check.message }, { status: 400 });

  const isOpenRouter = apiKey.startsWith("sk-or-v1-");
  const baseURL =
    process.env["OPENAI_BASE_URL"] ||
    (isOpenRouter ? "https://openrouter.ai/api/v1" : undefined);
  const modelName =
    process.env["OPENAI_MODEL"] ||
    (isOpenRouter ? "openai/gpt-4o" : "gpt-4o");

  const provider = createOpenAI({
    ...(baseURL ? { baseURL } : {}),
    apiKey,
    ...(isOpenRouter
      ? {
          headers: {
            "HTTP-Referer": "http://localhost:8081",
            "X-Title": "AKAHELIX",
          },
        }
      : {}),
  });

  const result = streamText({
    model: provider(modelName),
    instructions: buildAssistantPrompt(),
    messages: await convertToModelMessages(check.messages),
    abortSignal: request.signal,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: check.messages,
    sendReasoning: true,
    onError: describeError,
  });
}
