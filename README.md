# AKAHELIX

High-complexity molecular genetics, cytogenetics, and oncology tumour-marker laboratory set-up, validation, and regulatory compliance (CLIA, CAP, NYSDOH CLEP).

## Stack

- **Framework**: TanStack Start + React 19
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Animation**: Motion & Lenis smooth scrolling
- **Type Safety**: TypeScript & Zod

## Getting Started

### Prerequisites

- Node.js >= 20
- npm, pnpm, or bun

### Development

```sh
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run type check & build
npm run build
```

## Structure

- `src/routes/`: File-based application routes (TanStack Router)
- `src/components/site/`: Shared layout, motion, and navigation components
- `src/components/home/`: Landing page sections and interactive diagrams
- `src/content/site.ts`: Central data source for site copy, publications, and records
- `src/styles.css`: Global styles, CSS variables, and design tokens
