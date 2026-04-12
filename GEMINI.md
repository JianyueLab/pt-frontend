# GEMINI.md

This file provides foundational mandates and guidance to Gemini CLI when working with code in this repository.

## Commands

Use **Bun** (`bun`) by default (Node `>=22`, Bun `>=1.3`). **Do not use npm or yarn.**

```bash
bun install      # Install dependencies
bun dev          # Start local dev server at http://localhost:3000
bun build        # Create production build
bun preview      # Preview production build locally
bun start        # Start built app (production server)
bun generate     # Static site generation
bun typecheck    # Run Nuxt/TypeScript type checking
```

_Note: If `bun install` or `bun update` fails with a lockfile peer dependency error, delete `bun.lock` and re-run._

## Architecture & Project Structure

This is a **Nuxt 4** project using the `app/` directory convention. Keep feature code close to route files. Add reusable UI to `app/components/` if/when components are introduced.

- `app/app.vue`: root layout; wraps everything in `<UApp>` (Nuxt UI) with `<NuxtPage />`
- `app/pages/`: file-based routes (one `.vue` file per route)
- `app/assets/global.css`: imports Tailwind CSS 4 (`@tailwindcss`) and Nuxt UI styles (`@nuxt/ui`)
- `public/`: public files served as-is (e.g., `favicon.ico`, `robots.txt`)
- `i18n/locales/`: translation JSON files (`en.json`, `zh.json`)
- `nuxt.config.ts`: module and runtime configuration

**Key modules:**

- **@nuxt/ui v4** — component library (brings in Tailwind CSS 4 integration)
- **@nuxtjs/i18n** — localization; default locale `en`, supports `zh` / `zh-cn`
- **Tailwind CSS 4** — loaded via `@tailwindcss/vite` Vite plugin (not PostCSS)

_Note: Types are generated into `.nuxt/` by `nuxt prepare` (runs automatically via `postinstall`). Run `bun run postinstall` manually if types are stale._

## Coding Style & Naming Conventions

- Use **2-space indentation** in Vue, TS, and JSON.
- Prefer `<script setup lang="ts">` for Vue SFCs.
- Route files use Nuxt file routing names (e.g., `app/pages/about.vue`).
- Keep CSS in `app/assets/global.css` or component-scoped styles when localized.
- Use **lowercase, dash-separated** file names for route/components where possible.
- No dedicated lint/format config is committed yet; keep style consistent with existing files and Nuxt defaults.

## Testing Guidelines

There is no test framework configured yet. For now:

- Treat `bun typecheck` as the minimum CI-quality gate. Run it before opening a PR.
- Manually validate critical flows in `bun dev` and `bun preview`.
- If adding tests, prefer **Vitest** for unit tests and place them under `tests/` or beside source as `*.spec.ts`.

## Commit & Pull Request Guidelines

This repository currently has no commit history. Use this convention going forward:

- Commit format: `type(scope): summary` (e.g., `feat(i18n): add zh-cn locale keys`)
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- Keep commits focused and atomic.

PRs should include:

- Clear description of behavior changes
- Linked issue/task (if available)
- Validation steps (`bun typecheck`, manual checks)
- Screenshots/video for UI changes
