## Project rules

- All site copy and records live in `src/content/site.ts`; pages read from it so facts stay consistent across routes.
- Shared motion primitives live in `src/components/site/motion.tsx` (RevealText, FadeUp, ImageReveal, Counter, Magnetic, Marquee); reuse them instead of ad-hoc animations so motion stays uniform.
- The page intro curtain is pure CSS in the root shell so it never blocks content when JS is slow.
- Smooth scrolling uses Lenis, loaded dynamically in `SmoothScroll` and skipped for reduced-motion users.
- Home-only sections live in `src/components/home/`; service cards explain each service with a small drawn diagram or a photo, never an icon tile.
