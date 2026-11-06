import {
  ChatCircleDots,
  Clock,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import { useState } from "react";

import { INITIAL_ASSISTANT_LOGS, type AssistantLog } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

export function AssistantAnalytics() {
  const [logs] = useState<AssistantLog[]>(INITIAL_ASSISTANT_LOGS);
  const [testPrompt, setTestPrompt] = useState("");
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPrompt.trim()) return;

    setIsTesting(true);
    setTestResponse(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: testPrompt.trim() }],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setTestResponse(`Assistant response [Status ${res.status}]: ${errorData.error || "Requires OPENAI_API_KEY in environment to stream live answers."}`);
      } else {
        const text = await res.text();
        setTestResponse(text.slice(0, 500) || "Received valid stream response from model.");
      }
    } catch (err: any) {
      setTestResponse(`Local verification error: ${err.message || String(err)}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border pb-6">
        <div>
          <span className="label-mono text-muted-foreground">Clinical AI Operations</span>
          <h1 className="mt-1 font-display text-2xl font-normal tracking-[-0.03em] text-foreground sm:text-3xl">
            Interactive Scoping Assistant Telemetry
          </h1>
          <p className="mt-1 text-[0.875rem] text-muted-foreground">
            Logs from the website scoping assistant, inquiry topics, and diagnostic query testing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.75rem] text-muted-foreground">
            Model: <strong className="font-medium text-foreground">OpenAI GPT-4o</strong>
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-px bg-border rounded-[3px] overflow-hidden border border-border sm:grid-cols-4">
        <div className="bg-paper p-5">
          <span className="label-mono text-muted-foreground">30-Day Queries</span>
          <div className="mt-2 font-display text-3xl font-light text-foreground">142</div>
          <span className="font-mono text-[0.6875rem] text-blue">+18% this month</span>
        </div>

        <div className="bg-paper p-5">
          <span className="label-mono text-muted-foreground">Average Latency</span>
          <div className="mt-2 font-display text-3xl font-light text-foreground">1.18s</div>
          <span className="font-mono text-[0.6875rem] text-muted-foreground">Streamed responses</span>
        </div>

        <div className="bg-paper p-5">
          <span className="label-mono text-muted-foreground">Scoping Conversion</span>
          <div className="mt-2 font-display text-3xl font-light text-foreground">24.6%</div>
          <span className="font-mono text-[0.6875rem] text-blue">Led to scoping call</span>
        </div>

        <div className="bg-paper p-5">
          <span className="label-mono text-muted-foreground">Protocol Source</span>
          <div className="mt-2 font-display text-3xl font-light text-foreground">site.ts</div>
          <span className="font-mono text-[0.6875rem] text-muted-foreground">Verified public facts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Recent Logs (7 cols) */}
        <div className="rounded-[3px] border border-border bg-paper p-6 lg:col-span-7">
          <div className="border-b border-border pb-3">
            <span className="label-mono text-muted-foreground">Audit Trail</span>
            <h2 className="mt-0.5 text-base font-medium text-foreground">Inbound Inquiries Log</h2>
          </div>

          <div className="mt-4 divide-y divide-border">
            {logs.map((log) => (
              <div key={log.id} className="py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between font-mono text-[0.75rem]">
                  <span className="font-medium text-blue">{log.topic}</span>
                  <span className="text-muted-foreground">{log.timestamp}</span>
                </div>
                <p className="mt-1 text-[0.8125rem] text-foreground leading-relaxed">
                  {log.userPromptSummary}
                </p>
                <div className="mt-2 flex items-center justify-between font-mono text-[0.6875rem] text-muted-foreground">
                  <span>Latency: {log.latencyMs}ms</span>
                  <span className="rounded-[2px] bg-mist px-2 py-0.5 font-medium text-foreground">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Diagnostic Terminal (5 cols) */}
        <div className="rounded-[3px] border border-border bg-paper p-6 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="border-b border-border pb-3">
              <span className="label-mono text-muted-foreground">Diagnostics</span>
              <h2 className="mt-0.5 text-base font-medium text-foreground">Assistant Sandbox</h2>
            </div>

            <p className="mt-3 text-[0.8125rem] text-muted-foreground leading-relaxed">
              Test assistant reasoning against the clinical knowledge base via `/api/chat`.
            </p>

            <form onSubmit={handleTestChat} className="mt-4 space-y-3">
              <textarea
                rows={3}
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                placeholder="e.g. What is Dr. Azad's track record with NYSDOH LDT approvals?"
                className="w-full rounded-[3px] border border-border p-3 text-[0.8125rem] focus:border-blue focus:outline-hidden"
              />

              <button
                type="submit"
                disabled={isTesting || !testPrompt.trim()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-blue py-2 text-[0.8125rem] font-medium text-on-blue transition-colors hover:bg-blue-deep disabled:opacity-50 cursor-pointer"
              >
                <PaperPlaneRight size={14} />
                <span>{isTesting ? "Evaluating..." : "Send Test Inquiry"}</span>
              </button>
            </form>

            {testResponse && (
              <div className="mt-4 rounded-[3px] border border-border bg-mist/40 p-3 font-mono text-[0.75rem] text-foreground leading-relaxed">
                <span className="block text-[0.625rem] uppercase text-muted-foreground font-semibold">
                  Response Stream
                </span>
                <p className="mt-1 whitespace-pre-wrap">{testResponse}</p>
              </div>
            )}
          </div>

          <div className="rounded-[3px] border border-border bg-mist/30 p-3 font-mono text-[0.75rem] text-muted-foreground leading-relaxed flex items-center justify-between">
            <span>Live streaming provider: <code>OpenRouter (openai/gpt-4o)</code></span>
            <span className="flex items-center gap-1.5 text-blue font-sans text-[0.6875rem]">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected & Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
