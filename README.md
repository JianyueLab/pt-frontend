# Player Tools — JianYueLab

BGP/ASN lookup and analysis tool. Search ASNs to view prefix tables, routing relationships, and rankings.

## Features

- ASN detail pages — prefixes, upstream/downstream/peer relationships, org info, tags
- IPv4/IPv6 prefix rankings
- English and Chinese (Simplified) UI

## Requirements

- Node >= 22
- Bun >= 1.3

## Development

```bash
bun install
bun dev
```

```bash
bun build        # Production build
bun generate     # Static site generation
bun preview      # Preview production build
bun typecheck    # TypeScript type checking
```

If `bun install` fails with a lockfile peer dependency error, delete `bun.lock` and re-run.

## Stack

- [Nuxt 4](https://nuxt.com) + Vue 3
- [Nuxt UI v4](https://ui.nuxt.com) + Tailwind CSS 4
- [@nuxtjs/i18n](https://i18n.nuxtjs.org)
