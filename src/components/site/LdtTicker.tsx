import { ldts } from "@/content/site";
import { cn } from "@/lib/utils";

import { Marquee } from "./motion";

/** Slow ticker of the NYSDOH record, set like a specimen label. */
export function LdtTicker({ tone = "paper" }: { tone?: "paper" | "blue" }) {
  const dim = tone === "blue" ? "text-on-blue-muted" : "text-muted-foreground";
  return (
    <div className={cn("py-5", tone === "blue" ? "border-y border-on-blue-line" : "border-y border-border")}>
      <Marquee duration={90}>
        {ldts.map((l) => (
          <span key={l.project} className="label-mono flex items-center gap-3 whitespace-nowrap px-6">
            <span className={dim}>LDT {l.project}</span>
            <span>{l.test}</span>
            <span className={dim}>· {l.method} ·</span>
            <span className={cn("inline-flex items-center gap-1.5", tone === "blue" ? "text-on-blue" : "text-blue")}>
              <span className={cn("size-1.5", tone === "blue" ? "bg-on-blue" : "bg-blue")} />
              {l.status}
            </span>
            <span className={cn("ml-6", dim, "opacity-40")}>/</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
