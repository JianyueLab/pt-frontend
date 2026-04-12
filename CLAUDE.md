# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server
bun build        # Production build
bun generate     # Static site generation
bun preview      # Preview production build
bun start        # Start production server
bun typecheck    # Run TypeScript type checking
```

Use `bun` (not npm/yarn) as the package manager. Requires Node >=22 and Bun >=1.3.

If `bun install` or `bun update` fails with a lockfile peer dependency error, delete `bun.lock` and re-run.

## Architecture

**Nuxt 4** project using the `app/` directory convention (pages, components, assets live under `app/`).

- `app/app.vue` — root layout; wraps everything in `<UApp>` (Nuxt UI) with `<NuxtPage />`
- `app/pages/` — file-based routing
- `app/assets/global.css` — imports Tailwind CSS 4 (`@tailwindcss`) and Nuxt UI styles (`@nuxt/ui`)
- `i18n/locales/` — translation files (`en.json`, `zh-cn.json`)

**Key modules:**

- **@nuxt/ui v4** — component library (also brings in Tailwind CSS 4 integration)
- **@nuxtjs/i18n** — localization; default locale `en`, supports `zh-cn`
- **Tailwind CSS 4** — loaded via `@tailwindcss/vite` Vite plugin (not PostCSS)

Types are generated into `.nuxt/` by `nuxt prepare` (runs automatically via `postinstall`). Run `bun run postinstall` manually if types are stale.
