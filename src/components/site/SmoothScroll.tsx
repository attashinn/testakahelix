import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

/** Weighted smooth scrolling (Lenis). Skipped when the user prefers reduced motion. */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let cancelled = false;
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenis = new LenisCtor({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
      lenisRef.current = lenis;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
