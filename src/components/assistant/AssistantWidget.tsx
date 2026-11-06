import { CaretDown } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy, useEffect, useState } from "react";

import { Mark } from "@/components/site/Wordmark";
import { EASE } from "@/components/site/motion";
import { cn } from "@/lib/utils";

// The panel (chat, markdown renderer) only loads once a visitor opens it.
const AssistantPanel = lazy(() => import("./AssistantPanel"));

/** Help desk launcher, bottom-right on every page. */
export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    setMounted(true);
    setOpen((o) => !o);
  };

  return (
    <>
      {mounted && (
        <Suspense fallback={null}>
          <AssistantPanel open={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}

      <motion.button
        type="button"
        onClick={toggle}
        onPointerEnter={() => setMounted(true)}
        aria-expanded={open}
        aria-label={open ? "Close help" : "Open help and ask a question"}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 2.4 }}
        className={cn(
          "fixed bottom-4 right-4 z-[60] flex h-14 items-center gap-3 rounded-[6px] bg-blue p-2 text-on-blue shadow-[var(--shadow-panel)] transition-colors hover:bg-blue-deep md:bottom-6 md:right-6",
          open ? "w-14 justify-center" : "md:pr-5",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex size-10 items-center justify-center"
            >
              <CaretDown size={22} weight="light" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex items-center gap-3"
            >
              <Mark className="size-10 bg-on-blue text-blue [&_svg]:size-5" />
              <span className="hidden text-left text-[0.875rem] leading-tight md:block">
                Ask AKAHELIX
                <span className="label-mono block text-[0.625rem] text-on-blue-muted">Help desk · AI</span>
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
