# Architecture

My Dashboard is built as a local-first Next.js App Router application.

## Layers

- `src/app` defines routes and the global layout.
- `src/features` contains route-level screens that compose state and UI.
- `src/components` contains reusable layout, form, dashboard, Kanban, note, shared and UI primitives.
- `src/stores` owns persisted client state through Zustand.
- `src/lib/storage` centralizes browser storage so future API persistence can replace local storage without rewriting components.
- `src/types` defines contracts for tasks, notes and settings.
- `src/config` keeps project metadata and social links easy to edit.

## Persistence Strategy

The first version persists data in the browser with Zustand persist. Components read and mutate data through stores only. Direct `localStorage` access is intentionally isolated in `src/lib/storage`.

Future persistence can add repository functions or API routes between the stores and the backend, then move data to PostgreSQL with Prisma.

## Current Boundaries

This phase intentionally excludes authentication, remote databases and external integrations. Those concerns are reserved for future phases in the roadmap.
