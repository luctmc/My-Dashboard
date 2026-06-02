# My Dashboard

My Dashboard is a local-first personal productivity web app built with Next.js, TypeScript, Tailwind CSS, shadcn/ui-style components, Zustand, DnD Kit, Framer Motion, React Hook Form and Zod.

It includes a polished dashboard, a draggable Kanban board, quick notes with expiration states, local settings, light/dark theme support and documentation for future Vercel deployment.

## Features

- Dashboard with real productivity metrics from local state.
- Kanban tasks with priorities, tags, due dates, completion and drag-and-drop status changes.
- Quick notes with pinning, archiving, expiration, visual alerts and note-to-task conversion.
- Local settings for user name, theme preference and visual notification preferences.
- Clean App Router architecture prepared for future PostgreSQL, Prisma and authentication.

## Tech Stack

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui-inspired components powered by Radix UI primitives
- Zustand with persisted local storage
- React Hook Form and Zod
- DnD Kit
- Framer Motion
- date-fns
- Lucide React
- ESLint and Prettier

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run start` starts the production server.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run format` formats the project with Prettier.

## Folder Structure

```txt
src/
  app/              App Router pages and global layout
  components/       UI, layout and feature components
  config/           App-level configuration
  features/         Route-level feature views
  lib/              Utilities, date helpers, storage abstractions
  stores/           Zustand stores
  types/            Shared TypeScript contracts
docs/               Architecture, design system, roadmap and deployment docs
```

## Roadmap

Future phases are documented in [docs/ROADMAP.md](docs/ROADMAP.md), including authentication, PostgreSQL, Prisma, Google Calendar, Outlook Calendar, Gmail, Outlook Mail, push notifications, PWA, weekly reports, AI-assisted planning, Notion and Slack.

## Author

Developed by Lucas Timponi Mercadante Castro.

Social links are configurable in [src/config/app.config.ts](src/config/app.config.ts).
