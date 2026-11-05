# Project Guidelines & Architecture

## Core Rules

- **Content Single Source of Truth**: All site copy, clinical credentials, and records live in `src/content/site.ts`. Pages read directly from it so facts stay consistent across routes.
- **Shared Motion Primitives**: Motion components live in `src/components/site/motion.tsx` (`RevealText`, `FadeUp`, `ImageReveal`, `Counter`, `Magnetic`, `Marquee`). Reuse them rather than creating ad-hoc animations to preserve consistent timing and easing.
- **Root Shell Curtain**: The page intro curtain is CSS-driven in the root shell (`src/routes/__root.tsx`) to avoid blocking rendering if JS is delayed.
- **Smooth Scrolling**: Lenis smooth scrolling is handled dynamically in `SmoothScroll` and automatically disabled when reduced motion is preferred.
- **Visual Design**: Home-specific sections live in `src/components/home/`. Service cards use informative diagrams or photographs rather than generic AI icon tiles.
