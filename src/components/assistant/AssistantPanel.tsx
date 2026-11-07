import { useChat } from "@ai-sdk/react";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowsClockwise,
  CaretRight,
  ChatCircle,
  House,
  MagnifyingGlass,
  Newspaper,
  Question,
  X,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { DefaultChatTransport, type UIMessage } from "ai";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Mark } from "@/components/site/Wordmark";
import { EASE } from "@/components/site/motion";
import portrait from "@/assets/azad-portrait.jpg";
import abuSufianPortrait from "@/assets/abu-sufian.jpg";
import rafulAlamPortrait from "@/assets/raful-alam.jpg";
import badrulAnamPortrait from "@/assets/badrul-anam.jpg";
import abedulHaquePortrait from "@/assets/abedul-haque.jpg";
import cover from "@/assets/genetic-blueprint-cover.jpg";
import { assistant, company, faqs } from "@/content/site";
import { MAX_USER_MESSAGES, countUserMessages } from "@/lib/assistant/limits";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "akahelix-assistant-v1";

type Tab = "home" | "chat" | "help" | "updates";

const tabs: { id: Tab; label: string; Icon: typeof House }[] = [
  { id: "home", label: "Home", Icon: House },
  { id: "chat", label: "Ask", Icon: ChatCircle },
  { id: "help", label: "Help", Icon: Question },
  { id: "updates", label: "Updates", Icon: Newspaper },
];

function readableError(error: Error | undefined) {
  if (!error) return "";
  try {
    const parsed = JSON.parse(error.message) as { error?: string };
    if (parsed.error) return parsed.error;
  } catch {
    /* plain text */
  }
  if (/fetch|network/i.test(error.message)) return "You seem to be offline. Check your connection and try again.";
  return error.message || "Something went wrong. Please try again.";
}

export default function AssistantPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("home");
  const [helpQuery, setHelpQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop, setMessages, error, clearError, regenerate } = useChat({
    id: "akahelix-assistant",
    transport,
  });

  // Restore the one saved conversation from this browser.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown;
        if (Array.isArray(parsed)) setMessages(parsed as UIMessage[]);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setLoaded(true);
  }, [setMessages]);

  // Save it whenever an answer has finished.
  useEffect(() => {
    if (!loaded || status === "streaming" || status === "submitted") return;
    try {
      if (messages.length === 0) window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage full or blocked: the chat still works for this visit */
    }
  }, [messages, status, loaded]);

  const ask = (text: string) => {
    setTab("chat");
    if (status === "submitted" || status === "streaming") return;
    clearError();
    void sendMessage({ text });
  };

  const reset = () => {
    void stop();
    clearError();
    setMessages([]);
  };

  return (
    <motion.div
      role="dialog"
      aria-label="AKAHELIX help desk"
      aria-hidden={!open}
      initial={false}
      animate={open ? "open" : "closed"}
      variants={{
        open: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", visibility: "visible" },
        closed: { opacity: 0, y: 24, scale: 0.96, pointerEvents: "none", transitionEnd: { visibility: "hidden" } },
      }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ transformOrigin: "bottom right" }}
      className="fixed inset-x-2 bottom-20 top-2 z-[60] flex flex-col overflow-hidden rounded-[8px] bg-paper text-ink shadow-[var(--shadow-panel)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[min(44rem,calc(100svh-8rem))] sm:w-[24rem]"
    >
      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute inset-0 flex flex-col"
          >
            {tab === "home" && (
              <HomeTab
                onAsk={ask}
                onOpenChat={() => setTab("chat")}
                onSearch={(q) => {
                  setHelpQuery(q);
                  setTab("help");
                }}
                onClose={onClose}
                hasConversation={messages.length > 0}
              />
            )}
            {tab === "chat" && (
              <ChatTab
                messages={messages}
                status={status}
                error={readableError(error)}
                onSend={ask}
                onStop={() => void stop()}
                onRetry={() => {
                  clearError();
                  void regenerate();
                }}
                onReset={reset}
                onBack={() => setTab("home")}
                active={open && tab === "chat"}
              />
            )}
            {tab === "help" && (
              <HelpTab query={helpQuery} setQuery={setHelpQuery} onAsk={ask} onBack={() => setTab("home")} />
            )}
            {tab === "updates" && <UpdatesTab onBack={() => setTab("home")} onClose={onClose} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav className="grid shrink-0 grid-cols-4 border-t border-border bg-paper" aria-label="Help desk sections">
        {tabs.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center gap-1 py-3 text-[0.75rem] transition-colors",
                active ? "text-ink" : "text-muted-foreground hover:text-ink",
              )}
            >
              {active && (
                <motion.span
                  layoutId="assistant-tab"
                  className="absolute inset-x-5 top-0 h-[2px] bg-blue"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              )}
              <Icon size={22} weight={active ? "fill" : "light"} className={active ? "text-blue" : undefined} />
              {label}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}

/* ---------------------------------- Home ---------------------------------- */

function HomeTab({
  onAsk,
  onOpenChat,
  onSearch,
  onClose,
  hasConversation,
}: {
  onAsk: (q: string) => void;
  onOpenChat: () => void;
  onSearch: (q: string) => void;
  onClose: () => void;
  hasConversation: boolean;
}) {
  const [q, setQ] = useState("");

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
      {/* Blue band, cards overlap its lower edge */}
      <div className="surface-blue px-5 pb-24 pt-5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2">
            <Mark className="bg-on-blue text-blue" />
            <span className="text-[0.95rem] font-medium tracking-[-0.02em]">AKAHELIX</span>
          </span>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <img
                src={portrait}
                alt="Dr. Abul Kalam Azad"
                width={32}
                height={32}
                className="size-8 rounded-full object-cover object-[58%_30%] ring-2 ring-blue grayscale"
              />
              <img
                src={abuSufianPortrait}
                alt="Abu Sufian"
                width={32}
                height={32}
                className="size-8 rounded-full object-cover ring-2 ring-blue grayscale"
              />
              <img
                src={rafulAlamPortrait}
                alt="Dr. Rauful Alam"
                width={32}
                height={32}
                className="size-8 rounded-full object-cover ring-2 ring-blue grayscale"
              />
              <img
                src={badrulAnamPortrait}
                alt="Dr. Mohammad Badrul Anam"
                width={32}
                height={32}
                className="size-8 rounded-full object-cover ring-2 ring-blue grayscale"
              />
              <img
                src={abedulHaquePortrait}
                alt="Dr. Md. Abedul Haque"
                width={32}
                height={32}
                className="size-8 rounded-full object-cover ring-2 ring-blue grayscale"
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close help"
              className="flex size-8 items-center justify-center rounded-[4px] text-on-blue-muted transition-colors hover:bg-blue-deep hover:text-on-blue sm:hidden"
            >
              <X size={18} weight="light" />
            </button>
          </div>
        </div>
        <p className="label-mono mt-12 text-on-blue-muted">Help desk · {company.city}</p>
        <h2 className="mt-3 text-[1.9rem] leading-[1.05] tracking-[-0.045em]">
          <span className="text-on-blue-muted">{assistant.greeting}</span>
          <br />
          {assistant.question}
        </h2>
      </div>

      <div className="-mt-16 space-y-3 px-3 pb-4">
        <Card>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(q.trim());
            }}
            className="flex items-center gap-2 rounded-[4px] bg-mist px-3"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for help"
              aria-label="Search for help"
              className="h-11 min-w-0 flex-1 bg-transparent text-[0.9rem] font-medium outline-none placeholder:text-ink"
            />
            <button type="submit" aria-label="Search" className="text-muted-foreground hover:text-ink">
              <MagnifyingGlass size={18} weight="light" />
            </button>
          </form>
          <p className="label-mono mt-4 px-1 text-muted-foreground">Common questions</p>
          <ul className="mt-1">
            {assistant.suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => onAsk(s)}
                  className="group flex w-full items-center justify-between gap-3 rounded-[4px] px-1 py-2.5 text-left text-[0.875rem] transition-colors hover:text-blue"
                >
                  {s}
                  <CaretRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <button type="button" onClick={onOpenChat} className="block w-full text-left">
          <Card className="group flex items-center justify-between gap-4 transition-colors hover:bg-mist">
            <span>
              <span className="block text-[0.9375rem] font-medium">
                {hasConversation ? "Continue your conversation" : "Ask a question"}
              </span>
              <span className="mt-0.5 block text-[0.8125rem] text-muted-foreground">
                Answers in seconds from our published record
              </span>
            </span>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-blue text-on-blue transition-transform group-hover:-translate-y-0.5">
              <ChatCircle size={18} weight="light" />
            </span>
          </Card>
        </button>

        <Link to="/book" onClick={onClose} className="group block">
          <Card className="overflow-hidden p-0">
            <div className="flex items-end gap-4 bg-mist px-4 pt-4">
              <img
                src={cover}
                alt="Genetic Blueprint: Bench to Bed, book cover"
                width={84}
                height={120}
                className="w-[4.75rem] translate-y-2 shadow-[var(--shadow-panel)] transition-transform duration-500 group-hover:translate-y-0"
              />
              <div className="pb-4">
                <span className="label-mono text-blue">New · First edition 2026</span>
                <p className="mt-1 text-[0.95rem] font-medium leading-snug">Genetic Blueprint: Bench to Bed</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 text-[0.8125rem] text-muted-foreground">
              A review of medical laboratory genetics
              <ArrowUpRight size={14} className="text-ink" />
            </div>
          </Card>
        </Link>

        <Link to="/contact" onClick={onClose} className="group block">
          <Card className="chamfer flex items-center justify-between bg-ink text-on-blue [--cut:1.25rem]">
            <span>
              <span className="block text-[0.9375rem] font-medium">Book a free scoping call</span>
              <span className="mt-0.5 block text-[0.8125rem] text-on-blue-muted">Speak with our leadership team directly</span>
            </span>
            <ArrowUpRight size={18} weight="light" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Card>
        </Link>
      </div>
    </div>
  );
}

/* ---------------------------------- Chat ---------------------------------- */

function ChatTab({
  messages,
  status,
  error,
  onSend,
  onStop,
  onRetry,
  onReset,
  onBack,
  active,
}: {
  messages: UIMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  error: string;
  onSend: (text: string) => void;
  onStop: () => void;
  onRetry: () => void;
  onReset: () => void;
  onBack: () => void;
  active: boolean;
}) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";
  const atLimit = countUserMessages(messages) >= MAX_USER_MESSAGES;

  useEffect(() => {
    if (active && !busy) inputRef.current?.focus({ preventScroll: true });
  }, [active, busy, messages.length]);

  const submit = (message: PromptInputMessage) => {
    const value = message.text.trim();
    if (!value || busy || atLimit) return;
    onSend(value);
    setText("");
  };

  const last = messages[messages.length - 1];
  const waiting =
    busy && (!last || last.role === "user" || !last.parts?.some((p: any) => p.type === "text" && p.text.length > 0));

  return (
    <>
      <PanelHeader onBack={onBack}>
        <Mark />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.9rem] font-medium leading-tight">AKAHELIX assistant</span>
          <span className="block truncate text-[0.75rem] text-muted-foreground">AI · answers from our published record</span>
        </span>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={onReset}
            aria-label="Start a new conversation"
            title="New conversation"
            className="flex size-8 items-center justify-center rounded-[4px] text-muted-foreground transition-colors hover:bg-mist hover:text-ink"
          >
            <ArrowsClockwise size={17} weight="light" />
          </button>
        )}
      </PanelHeader>

      <Conversation className="min-h-0" data-lenis-prevent>
        <ConversationContent className="gap-6 px-4 py-5">
          {messages.length === 0 && (
            <div className="pt-4">
              <div className="ticks w-24 text-blue" />
              <p className="mt-4 text-[1.35rem] leading-tight tracking-[-0.035em]">
                Ask about lab set-up, test validation, licensing or the book.
              </p>
              <p className="mt-2 text-[0.8125rem] text-muted-foreground">
                The assistant uses only what AKAHELIX has published. For anything specific to your lab, book a free
                scoping call.
              </p>
              <div className="mt-5 flex flex-col items-start gap-2">
                {assistant.suggestions.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onSend(s)}
                    className="rounded-[4px] border border-border px-3 py-2 text-left text-[0.8125rem] transition-colors hover:border-blue hover:text-blue"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent
                className={cn(
                  "text-[0.875rem] leading-relaxed",
                  m.role === "user"
                    ? "group-[.is-user]:rounded-[6px] group-[.is-user]:bg-blue group-[.is-user]:text-on-blue"
                    : "[&_a]:text-blue [&_a]:underline [&_a]:underline-offset-2",
                )}
              >
                {m.parts?.map((part: any, i: number) =>
                  part.type === "text" ? (
                    m.role === "assistant" ? (
                      <MessageResponse key={i} isAnimating={busy && m.id === last?.id}>
                        {part.text}
                      </MessageResponse>
                    ) : (
                      <p key={i} className="whitespace-pre-wrap">
                        {part.text}
                      </p>
                    )
                  ) : null,
                )}
              </MessageContent>
            </Message>
          ))}

          {waiting && (
            <div className="flex items-center gap-2 text-[0.8125rem]">
              <span className="size-1.5 animate-pulse bg-blue" />
              <Shimmer>Checking the record…</Shimmer>
            </div>
          )}

          {error && !busy && (
            <div className="rounded-[4px] border border-destructive/30 px-3 py-2.5 text-[0.8125rem] text-destructive">
              {error}
              <button type="button" onClick={onRetry} className="ml-2 font-medium underline underline-offset-2">
                Try again
              </button>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="shrink-0 px-3 pb-3">
        {atLimit ? (
          <p className="rounded-[4px] bg-mist px-3 py-3 text-[0.8125rem] text-muted-foreground">
            This conversation is full.{" "}
            <button type="button" onClick={onReset} className="font-medium text-ink underline underline-offset-2">
              Start a new one
            </button>{" "}
            or book a free scoping call.
          </p>
        ) : (
          <PromptInput onSubmit={submit} className="rounded-[6px] [&_[data-slot=input-group]]:rounded-[6px]">
            <PromptInputTextarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask a question…"
              className="min-h-11 text-[0.875rem]"
            />
            <PromptInputFooter className="justify-between">
              <span className="label-mono pl-1 text-[0.625rem] text-muted-foreground">AI · can make mistakes</span>
              <PromptInputSubmit status={status} onStop={onStop} disabled={!busy && !text.trim()} />
            </PromptInputFooter>
          </PromptInput>
        )}
      </div>
    </>
  );
}

/* ---------------------------------- Help ---------------------------------- */

function HelpTab({
  query,
  setQuery,
  onAsk,
  onBack,
}: {
  query: string;
  setQuery: (q: string) => void;
  onAsk: (q: string) => void;
  onBack: () => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const q = query.trim().toLowerCase();
  const results = faqs
    .map((f, i) => ({ ...f, i }))
    .filter((f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));

  return (
    <>
      <PanelHeader onBack={onBack}>
        <span className="flex-1 text-[0.9rem] font-medium">Help</span>
      </PanelHeader>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4" data-lenis-prevent>
        <div className="flex items-center gap-2 rounded-[4px] bg-mist px-3">
          <MagnifyingGlass size={17} weight="light" className="text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for help"
            aria-label="Search for help"
            className="h-11 min-w-0 flex-1 bg-transparent text-[0.9rem] outline-none placeholder:text-muted-foreground"
          />
        </div>

        <p className="label-mono mt-5 text-muted-foreground">
          {results.length} {results.length === 1 ? "answer" : "answers"}
        </p>
        <ul className="mt-2 divide-y divide-border border-y border-border">
          {results.map((f) => {
            const isOpen = openIndex === f.i;
            return (
              <li key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : f.i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 py-3.5 text-left text-[0.875rem] font-medium"
                >
                  {f.q}
                  <CaretRight
                    size={14}
                    className={cn("shrink-0 transition-transform duration-300", isOpen && "rotate-90 text-blue")}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-[0.8125rem] leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 rounded-[4px] border border-border p-4">
          <p className="text-[0.875rem] font-medium">{results.length === 0 ? "No match." : "Didn't find it?"}</p>
          <p className="mt-1 text-[0.8125rem] text-muted-foreground">The assistant can answer in your own words.</p>
          <button
            type="button"
            onClick={() => onAsk(query.trim() || "What can AKAHELIX help my laboratory with?")}
            className="mt-3 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-blue"
          >
            {query.trim() ? `Ask “${query.trim()}”` : "Ask the assistant"}
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}

/* -------------------------------- Updates --------------------------------- */

function UpdatesTab({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  return (
    <>
      <PanelHeader onBack={onBack}>
        <span className="flex-1 text-[0.9rem] font-medium">Updates</span>
      </PanelHeader>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3" data-lenis-prevent>
        <ul className="space-y-2.5">
          {assistant.updates.map((u, i) => (
            <li key={u.title}>
              <Link to={u.to} onClick={onClose} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.05 * i }}
                >
                  <Card className="transition-colors group-hover:bg-mist">
                    <div className="flex items-center justify-between">
                      <span className="label-mono text-blue">{u.tag}</span>
                      <span className="label-mono text-muted-foreground">{u.date}</span>
                    </div>
                    <p className="mt-2 text-[0.9375rem] font-medium leading-snug">{u.title}</p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">{u.body}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-medium">
                      Read more
                      <ArrowUpRight size={12} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Card>
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* --------------------------------- Shared --------------------------------- */

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-[6px] border border-border bg-paper p-4", className)}>{children}</div>;
}

function PanelHeader({ onBack, children }: { onBack: () => void; children: ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-border px-3 py-3">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to help home"
        className="flex size-8 items-center justify-center rounded-[4px] text-muted-foreground transition-colors hover:bg-mist hover:text-ink"
      >
        <ArrowLeft size={17} weight="light" />
      </button>
      {children}
    </div>
  );
}
