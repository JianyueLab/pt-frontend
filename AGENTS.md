# Repository Guidelines

## Project Structure & Module Organization

This is a Nuxt 4 app using the `app/` directory convention.

- `app/app.vue`: root shell (`<UApp>` + `<NuxtPage />`)
- `app/pages/`: file-based routes (one `.vue` file per route)
- `app/assets/`: global styles and static design assets
- `public/`: public files served as-is (for example `favicon.ico`, `robots.txt`)
- `i18n/locales/`: locale JSON files
- `nuxt.config.ts`: module and runtime configuration

Keep feature code close to route files. Add reusable UI to `app/components/` if/when components are introduced.

## Build, Test, and Development Commands

Use Bun by default (Node `>=22`, Bun `>=1.3`).

- `bun install`: install dependencies
- `bun dev`: run local dev server at `http://localhost:3000`
- `bun build`: create production build
- `bun preview`: preview production build locally
- `bun start`: run built app
- `bun generate`: static generation
- `bun typecheck`: run Nuxt/TypeScript checks

Run `bun typecheck` before opening a PR.

## Coding Style & Naming Conventions

- Use 2-space indentation in Vue, TS, and JSON.
- Prefer `<script setup lang="ts">` for Vue SFCs.
- Route files use Nuxt file routing names (example: `app/pages/about.vue`).
- Keep CSS in `app/assets/global.css` or component-scoped styles when localized.
- Use lowercase, dash-separated file names for route/components where possible.

No dedicated lint/format config is committed yet; keep style consistent with existing files and Nuxt defaults.

## Testing Guidelines

There is no test framework configured yet. For now:

- Treat `bun typecheck` as the minimum CI-quality gate.
- Manually validate critical flows in `bun dev` and `bun preview`.
- If adding tests, prefer Vitest for unit tests and place them under `tests/` or beside source as `*.spec.ts`.

## Commit & Pull Request Guidelines

This repository currently has no commit history. Use this convention going forward:

- Commit format: `type(scope): summary` (for example `feat(i18n): add zh-cn locale keys`)
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- Keep commits focused and atomic.

PRs should include:

- Clear description of behavior changes
- Linked issue/task (if available)
- Validation steps (`bun typecheck`, manual checks)
- Screenshots/video for UI changes
