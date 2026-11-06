declare module "ai" {
  export interface UIMessage {
    id: string;
    role: "system" | "user" | "assistant" | "data";
    content?: string;
    parts?: any[];
    [key: string]: any;
  }
  export type ChatStatus = "idle" | "submitted" | "streaming" | "ready" | "error";
  export type FileUIPart = any;
  export type SourceDocumentUIPart = any;
  export const DefaultChatTransport: any;
  export function convertToModelMessages(...args: any[]): any;
  export function streamText(...args: any[]): any;
}

declare module "@ai-sdk/react" {
  export function useChat(...args: any[]): any;
}
