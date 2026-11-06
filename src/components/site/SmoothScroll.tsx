import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

/** Responsive smooth scrolling (Lenis). Skipped when the user prefers reduced motion. */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    let cancelled = false;
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenis = new LenisCtor({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        autoRaf: true,
      });
      lenisRef.current = lenis;
    });
    return () => {
      cancelled = true;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
