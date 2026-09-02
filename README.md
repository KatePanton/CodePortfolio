# Code Portfolio

A personal code portfolio built with:

- [Vite](https://vite.dev/) — build tool
- [React Router v7](https://reactrouter.com/) — routing
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) — code snippets
- TypeScript
- Deployed on [Vercel](https://vercel.com/)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Adding a project

Add an entry to `src/data/projects.ts`. Each project automatically gets a detail
page at `/projects/:slug` with syntax-highlighted code.

## Deployment

Live at [katepanton.dev](https://katepanton.dev/).

This repo includes a `vercel.json` with an SPA rewrite so client-side routes
resolve correctly. Vercel detects the Vite preset automatically (build
command `npm run build`, output directory `dist`).
