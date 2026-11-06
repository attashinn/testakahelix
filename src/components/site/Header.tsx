import { List, X } from "@phosphor-icons/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { company, nav } from "@/content/site";
import { cn } from "@/lib/utils";

import { Cta } from "./Cta";
import { EASE } from "./motion";
import { Wordmark } from "./Wordmark";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 24);
    setHidden(v > 320 && v > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
          open ? "border-transparent bg-transparent" : "bg-background",
          scrolled && !open ? "border-border" : "border-transparent",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className={cn("container-x pt-2 transition-opacity", open && "opacity-0")} aria-hidden>
          <div className="ticks text-foreground" />
        </div>
        <div className="container-x flex h-14 items-center justify-between md:h-16">
          <Link
            to="/"
            className={cn("relative z-10 transition-colors", open ? "text-on-blue" : "text-foreground")}
            aria-label="AKAHELIX home"
          >
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-[3px] px-3 py-1.5 text-[0.8125rem] text-foreground/75 transition-colors duration-300 hover:bg-mist hover:text-foreground data-[status=active]:bg-blue-soft data-[status=active]:text-blue"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/sign-in"
              className="rounded-[3px] border border-border px-3.5 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-mist"
            >
              Sign In
            </Link>
            <Cta to="/contact" variant="outline" size="md" className="h-10 pl-4 pr-1 text-[0.8125rem] [&>span:last-child]:size-8">
              Contact us
            </Cta>
          </div>

          <button
            type="button"
            className={cn(
              "relative z-10 flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden",
              open ? "border-on-blue/40 text-on-blue" : "border-foreground/15 text-foreground",
            )}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-4" /> : <List className="size-4" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="surface-blue fixed inset-0 z-40 flex flex-col justify-between px-5 pb-8 pt-24 lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {[{ to: "/" as const, label: "Home" }, ...nav, { to: "/contact" as const, label: "Contact" }, { to: "/sign-in" as const, label: "Sign in" }].map(
                (item, i) => (
                  <div key={item.to} className="overflow-hidden border-b border-on-blue-line">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.05 }}
                    >
                      <Link to={item.to} className="flex items-baseline justify-between py-4">
                        <span className="font-display text-4xl tracking-[-0.04em]">{item.label}</span>
                        <span className="label-mono text-on-blue-muted">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </div>
                ),
              )}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="label-mono flex justify-between gap-4 text-on-blue-muted"
            >
              <span>{company.city}</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
