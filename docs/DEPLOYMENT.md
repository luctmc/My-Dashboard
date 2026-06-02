# Deployment

My Dashboard is prepared for Vercel deployment.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Vercel Setup

1. Create or open a Vercel account.
2. Import the GitHub repository.
3. Keep the default Next.js framework preset.
4. Use `npm run build` as the build command.
5. Deploy.

## GitHub Actions

The CI workflow in `.github/workflows/ci.yml` installs dependencies, runs lint, runs TypeScript checks and builds the application.

The deployment workflow is only a reference because the main deployment path is Vercel's repository integration.
