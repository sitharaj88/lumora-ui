# Lumora UI

> An open-source, enterprise-focused Tailwind v4 design system with 65
> components, 39 themes, React + Vue adapters, and 6 production-ready
> multi-page templates.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![npm — core](https://img.shields.io/npm/v/@lumora-design/core.svg?label=%40lumora-design%2Fcore)](https://www.npmjs.com/package/@lumora-design/core)
[![npm — themes](https://img.shields.io/npm/v/@lumora-design/themes.svg?label=%40lumora-design%2Fthemes)](https://www.npmjs.com/package/@lumora-design/themes)
[![npm — react](https://img.shields.io/npm/v/@lumora-design/react.svg?label=%40lumora-design%2Freact)](https://www.npmjs.com/package/@lumora-design/react)
[![npm — vue](https://img.shields.io/npm/v/@lumora-design/vue.svg?label=%40lumora-design%2Fvue)](https://www.npmjs.com/package/@lumora-design/vue)

Lumora UI gives you a stable `lm-*` class contract that works straight from
HTML, plus thin framework adapters for React and Vue. One token system, one
plugin, every component reachable without JavaScript.

## Why Lumora UI

- **Tailwind-native.** Drop in via `@plugin "@lumora-design/core"` — no separate
  CSS bundle, no runtime, no peer-dependency dance.
- **Class-first contract.** Every component is one or two `lm-*` classes
  on plain HTML. Frameworks are optional, the markup is the API.
- **Themed by tokens, not overrides.** 39 themes flip a single
  `data-lm-theme` attribute. No global CSS to fight, no `darkMode: 'class'`
  juggling.
- **WCAG-AA by default.** Every theme passes contrast checks for every
  semantic surface; every component ships with an accessibility checklist.
- **Enterprise patterns built in.** Command bar, filter bar, bulk-action
  bar, audit log, account drilldown, pipeline kanban — composed from the
  same primitives.

## Quick start

### 1. Install

```bash
pnpm add -D tailwindcss @lumora-design/core
```

`@lumora-design/core` is the only package most projects need — it transitively
ships every theme. Add the React or Vue adapter only if you want JS
components:

```bash
pnpm add @lumora-design/react   # React adapter
pnpm add @lumora-design/vue     # Vue adapter
```

### 2. Wire up Tailwind v4

```css
/* app.css */
@import "tailwindcss";
@plugin "@lumora-design/core";
```

That single `@plugin` line emits the `lm-*` component classes plus every
theme as a `[data-lm-theme="…"]` selector.

### 3. Pick a theme on the root element

```html
<html data-lm-theme="lumora-dark">
  <!-- Switch themes anywhere with a single attribute change. -->
</html>
```

### 4. Use it

```html
<button class="lm-btn lm-btn-primary lm-btn-md">Save changes</button>

<article class="lm-card">
  <header class="lm-card-header">
    <h3 class="lm-card-title">Account</h3>
    <p class="lm-card-subtitle">Plan and billing</p>
  </header>
  <div class="lm-card-body">…</div>
</article>
```

Or use the React adapter:

```tsx
import { LumoraButton, LumoraCard } from "@lumora-design/react";

export function SaveBar() {
  return (
    <LumoraCard variant="raised">
      <LumoraCard.Body>Unsaved changes</LumoraCard.Body>
      <LumoraCard.Footer>
        <LumoraButton variant="primary">Save</LumoraButton>
      </LumoraCard.Footer>
    </LumoraCard>
  );
}
```

The Vue adapter mirrors the API exactly:

```vue
<script setup lang="ts">
import { LumoraButton, LumoraCard, LumoraCardBody, LumoraCardFooter } from "@lumora-design/vue";
</script>

<template>
  <LumoraCard variant="raised">
    <LumoraCardBody>Unsaved changes</LumoraCardBody>
    <LumoraCardFooter>
      <LumoraButton variant="primary">Save</LumoraButton>
    </LumoraCardFooter>
  </LumoraCard>
</template>
```

## What's in the box

- **65 components** across 11 categories — Action, Form, Display, Feedback,
  Layout, Navigation, Overlay, Disclosure, Data, Media, and Pattern.
- **39 themes** — Lumora Light/Dark, Graphite, Solarized, Nord, Tokyo,
  Aurora, Sunset, Forest, Cobalt, Ember, Slate, and more — each WCAG-AA
  verified.
- **6 multi-page templates** — Admin Console, CRM, Project tracker,
  E-commerce, Marketing, Analytics — 70+ preview routes seeded with
  realistic sample data.
- **Documentation site** — searchable catalog, per-component live preview,
  HTML / React / Vue code tabs, CSS class table, React props table,
  accessibility notes, and a sticky table of contents.

## Packages

| Package                 | Purpose                                                           |
| ----------------------- | ----------------------------------------------------------------- |
| `@lumora-design/core`   | Tailwind v4 plugin and the complete `lm-*` class contract.        |
| `@lumora-design/themes` | Theme tokens, theme CSS files, and contrast validation helpers.   |
| `@lumora-design/react`  | React wrappers and behavior helpers around the class contract.    |
| `@lumora-design/vue`    | Vue wrappers and behavior helpers around the class contract.      |
| `@lumora-design/docs`   | Next.js documentation site (lives in `apps/docs`, not published). |

## Documentation

- **Components** — `/components` — searchable catalog with live previews.
- **Themes** — `/theming` — tokens, the `data-lm-theme` switch, and the
  contrast verification tooling.
- **Patterns** — `/patterns` — composed enterprise toolbars and shells.
- **Templates** — `/templates` — 6 multi-page application templates.
- **API reference** — `/api` — props for the React adapter.
- **Accessibility** — `/accessibility` — the per-component a11y checklist.

## Browser support

The latest two versions of Chrome, Firefox, Safari, and Edge. Tailwind v4
features (CSS cascade layers, `color-mix`, `oklab`) require Chrome 111+,
Safari 16.4+, Firefox 113+.

## Accessibility

- Every theme is WCAG-AA verified for foreground contrast on every
  semantic surface (background, surface, surface-raised, primary, success,
  warning, danger, info, accent).
- Every component ships with an accessibility checklist documented on its
  detail page.
- The cross-template audit (15 representative pages) runs `@axe-core/playwright`
  on every commit and asserts zero serious or critical violations under
  WCAG 2.1 AA + best-practice tags.

## Development

```bash
pnpm install
pnpm check       # lint + format + typecheck + build + tests
pnpm docs:dev    # build packages then run the docs site
```

### Quality gates

```bash
pnpm lint          # ESLint with --max-warnings=0
pnpm format:check  # Prettier
pnpm typecheck     # tsc --noEmit across all workspaces
pnpm build         # tsup builds for the four publishable packages
pnpm test          # Vitest unit tests
pnpm docs:build    # Next.js production build
pnpm test:visual   # Playwright smoke + a11y + visual regression
```

`pnpm check` runs the first five sequentially. CI runs the full set on
every push.

### Releases

```bash
pnpm changeset           # describe a release
pnpm changeset version   # apply pending changesets
pnpm release:check       # full pre-flight (check + docs + pack:dry)
pnpm release:dry         # build packages and pack tarballs locally
pnpm release             # publish to npm (used by CI)
```

The GitHub Actions release workflow runs on every push to `main` — it
either opens a "Version Packages" PR or, if pending changesets are
already applied, publishes the four packages to npm.

## Contributing

We welcome PRs. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for the local
setup, naming conventions for `lm-*` classes, and how to ship a changeset.

By participating you agree to the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Security

Found a vulnerability? Please follow the disclosure process in
[SECURITY.md](./SECURITY.md) — do not open a public issue.

## Maintainer

Built and maintained by **[Sitharaj Seenivasan](https://sitharaj.in)**.

|          |                                                         |
| -------- | ------------------------------------------------------- |
| Website  | [sitharaj.in](https://sitharaj.in)                      |
| GitHub   | [@sitharaj88](https://github.com/sitharaj88)            |
| LinkedIn | [in/sitharaj08](https://www.linkedin.com/in/sitharaj08) |
| npm      | [~sitharaj](https://www.npmjs.com/~sitharaj)            |

If Lumora UI saves your team time, [buy me a coffee](https://www.buymeacoffee.com/sitharaj88)
or [sponsor on GitHub](https://github.com/sponsors/sitharaj88) — every cup keeps the
themes contrast-checked and the templates shipping.

## License

[MIT](./LICENSE) — Copyright (c) 2026 [Sitharaj Seenivasan](https://sitharaj.in) and contributors.
