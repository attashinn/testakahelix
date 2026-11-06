# AKAHELIX — Genetics Laboratory Set-Up & Validation

A high-performance modern web application for AKAHELIX, planning, building, and validating CAP and NYSDOH-ready molecular genetics and cytogenetics laboratories.

## Tech Stack

- **Framework**: TanStack Start / React 19
- **Routing**: TanStack Router (file-based routing)
- **Styling**: Tailwind CSS v4
- **Motion**: Motion (Framer Motion)
- **Smooth Scroll**: Lenis
- **State & Data**: TanStack Query

## Development

Prerequisites: Node.js (v20+) and npm or bun.

```sh
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Project Structure

- `src/routes/` — File-based route definitions
- `src/components/` — UI components, sections, and motion primitives
- `src/content/site.ts` — Single source of truth for site copy and records
- `src/lib/` — Shared utilities and server handlers
- `public/` — Static assets, icons, and metadata
