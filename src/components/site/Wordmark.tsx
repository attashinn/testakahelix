import { cn } from "@/lib/utils";

/** Mark: stylized DNA double helix mark representing AKAHELIX laboratory genetics. */
export function Mark({ className }: { className?: string }) {
  return (
    <span className={cn("flex size-7 items-center justify-center rounded-[4px] bg-blue text-on-blue", className)} aria-hidden>
      <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M6 2.5C6 6 14 7 14 10C14 13 6 14 6 17.5" />
        <path d="M14 2.5C14 6 6 7 6 10C6 13 14 14 14 17.5" />
        <line x1="7.5" y1="4.5" x2="12.5" y2="4.5" />
        <line x1="8.5" y1="7.5" x2="11.5" y2="7.5" />
        <line x1="8.5" y1="12.5" x2="11.5" y2="12.5" />
        <line x1="7.5" y1="15.5" x2="12.5" y2="15.5" />
      </svg>
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark />
      <span className="font-sans text-[1rem] font-medium tracking-[-0.02em]">AKAHELIX</span>
    </span>
  );
}
