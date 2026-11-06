import { cn } from "@/lib/utils";

/** Mark: DNA double-helix mark on a blue tile. */
export function Mark({ className }: { className?: string }) {
  return (
    <span className={cn("flex size-7 items-center justify-center rounded-[4px] bg-blue text-on-blue", className)} aria-hidden>
      <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M4 3 C 4 9, 16 11, 16 17" />
        <path d="M16 3 C 16 9, 4 11, 4 17" />
        <line x1="5.5" y1="5" x2="14.5" y2="5" />
        <line x1="8" y1="8" x2="12" y2="8" />
        <line x1="8" y1="12" x2="12" y2="12" />
        <line x1="5.5" y1="15" x2="14.5" y2="15" />
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
