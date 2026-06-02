# Design System

My Dashboard uses a restrained SaaS-oriented interface with generous spacing, subtle borders, soft shadows and clear hierarchy.

## Tokens

- Colors are defined as CSS variables in `src/app/globals.css`.
- Radius, shadows and surface styles are exposed through reusable Tailwind utility classes.
- Light and dark themes share the same semantic tokens: `background`, `foreground`, `card`, `primary`, `muted`, `border`, `accent`, `destructive`.

## Components

The UI follows shadcn/ui composition patterns:

- Button
- Card
- Badge
- Dialog
- AlertDialog
- Tabs
- Input
- Textarea
- EmptyState
- ConfirmDialog
- FormModal
- SectionHeader

## Interaction

Microinteractions use Framer Motion and CSS transitions. Destructive actions require confirmation. Important state changes show toast feedback.
