import { Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { faqs } from "@/content/site";
import { cn } from "@/lib/utils";

import { EASE } from "./motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="border-t border-border">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
            >
              <span className="flex items-baseline gap-5">
                <span className="label-mono text-muted-foreground">0{i + 1}</span>
                <span className="font-display text-xl tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-1 md:text-2xl">
                  {f.q}
                </span>
              </span>
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 ease-out-expo",
                  isOpen ? "rotate-45 border-blue bg-blue text-on-blue" : "group-hover:border-foreground",
                )}
              >
                <Plus className="size-3.5" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[60ch] pb-7 pl-10 text-muted-foreground md:pl-12">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
