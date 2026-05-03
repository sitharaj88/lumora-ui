<div align="center">

# Lumora UI

### The class-first Tailwind v4 design system for enterprise teams.

**65 components · 39 themes · React, Vue, and plain HTML · 6 production templates · WCAG-AA out of the box.**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-19-149eca.svg?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vue](https://img.shields.io/badge/Vue-3.5-42b883.svg?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-000.svg?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![WCAG AA](https://img.shields.io/badge/WCAG-2.1%20AA-22c55e.svg?style=flat-square)](#accessibility)

[![@lumora-design/core](https://img.shields.io/npm/v/@lumora-design/core.svg?label=%40lumora-design%2Fcore&style=flat-square&color=cb3837)](https://www.npmjs.com/package/@lumora-design/core)
[![@lumora-design/themes](https://img.shields.io/npm/v/@lumora-design/themes.svg?label=%40lumora-design%2Fthemes&style=flat-square&color=cb3837)](https://www.npmjs.com/package/@lumora-design/themes)
[![@lumora-design/react](https://img.shields.io/npm/v/@lumora-design/react.svg?label=%40lumora-design%2Freact&style=flat-square&color=cb3837)](https://www.npmjs.com/package/@lumora-design/react)
[![@lumora-design/vue](https://img.shields.io/npm/v/@lumora-design/vue.svg?label=%40lumora-design%2Fvue&style=flat-square&color=cb3837)](https://www.npmjs.com/package/@lumora-design/vue)

**[Documentation](https://sitharaj88.github.io/lumora-design/)** · **[Components](https://sitharaj88.github.io/lumora-design/components/)** · **[Templates](https://sitharaj88.github.io/lumora-design/templates/)** · **[Themes](https://sitharaj88.github.io/lumora-design/docs/theming/)** · **[Changelog](./CHANGELOG.md)**

</div>

---

## Why Lumora UI

- **Class-first.** Every component is one or two `lm-*` classes on plain HTML. Frameworks are optional — the markup _is_ the API. Drop into HTML, Astro, Rails, Django, Phoenix, Laravel, or anywhere Tailwind runs.
- **Tailwind v4 native.** A single `@plugin "@lumora-design/core";` line in your CSS. No separate stylesheet, no CSS-in-JS runtime, no peer-dependency dance. Built on cascade layers, `color-mix`, and `oklab`.
- **Tokens, not overrides.** 39 themes flip a single `data-lm-theme` attribute. No global cascade fights, no `darkMode: 'class'` juggling. Switch themes anywhere — at runtime, per route, even per `<section>`.
- **WCAG-AA by default.** Every theme is contrast-verified for every semantic surface. Every component ships with an accessibility checklist. Cross-template axe audit on every commit — zero serious or critical violations.
- **Enterprise patterns.** Not just primitives — composed shells: command bar, filter bar, bulk-action bar, audit log, account drilldown, pipeline kanban, cohort heatmap, settings drawer.
- **React + Vue + HTML.** The same class contract powers all three. The React and Vue adapters are thin wrappers — pick whichever your team uses, or skip them entirely. No re-skinning, ever.

---

## Quick start

```bash
pnpm add -D tailwindcss @lumora-design/core
```

```css
/* app.css */
@import "tailwindcss";
@plugin "@lumora-design/core";
```

```html
<html data-lm-theme="lumora-dark">
  <body>
    <button class="lm-btn lm-btn-primary lm-btn-md">Save changes</button>
  </body>
</html>
```

That's the full setup. `@lumora-design/core` ships every theme — pick one with the `data-lm-theme` attribute and switch at any time.

---

## Frameworks

Lumora UI supports three usage modes. They all emit the **same `lm-*` class contract** — your CSS bundle, your themes, and your accessibility guarantees are identical across all three.

<details open>
<summary><strong>HTML + Tailwind</strong> — the canonical, framework-free way</summary>

### Install

```bash
pnpm add -D tailwindcss @lumora-design/core
```

### Wire up

```css
/* app.css */
@import "tailwindcss";
@plugin "@lumora-design/core";
```

### Use

```html
<html data-lm-theme="lumora-dark">
  <body>
    <article class="lm-card">
      <header class="lm-card-header">
        <h3 class="lm-card-title">Account</h3>
        <p class="lm-card-subtitle">Plan and billing</p>
      </header>
      <div class="lm-card-body">
        <label class="lm-field">
          <span class="lm-label">Workspace email</span>
          <input class="lm-input" placeholder="you@company.com" />
        </label>
      </div>
      <footer class="lm-card-footer">
        <button class="lm-btn lm-btn-ghost lm-btn-md">Cancel</button>
        <button class="lm-btn lm-btn-primary lm-btn-md">Save</button>
      </footer>
    </article>
  </body>
</html>
```

Works everywhere Tailwind runs: Astro, Rails, Django, Phoenix, Laravel, raw HTML, server-rendered or static.

</details>

<details>
<summary><strong>React</strong> — typed component wrappers</summary>

### Install

```bash
pnpm add @lumora-design/core @lumora-design/react
```

### Wire up Tailwind

```css
/* app/globals.css */
@import "tailwindcss";
@plugin "@lumora-design/core";
```

```tsx
// app/layout.tsx (Next.js)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lm-theme="lumora-dark">
      <body>{children}</body>
    </html>
  );
}
```

### Use

```tsx
import {
  LumoraButton,
  LumoraCard,
  LumoraField,
  LumoraInput,
  LumoraLabel
} from "@lumora-design/react";

export function AccountSettings() {
  return (
    <LumoraCard variant="raised">
      <LumoraCard.Header>
        <LumoraCard.Title>Account</LumoraCard.Title>
        <LumoraCard.Subtitle>Plan and billing</LumoraCard.Subtitle>
      </LumoraCard.Header>
      <LumoraCard.Body>
        <LumoraField>
          <LumoraLabel>Workspace email</LumoraLabel>
          <LumoraInput size="md" placeholder="you@company.com" />
        </LumoraField>
      </LumoraCard.Body>
      <LumoraCard.Footer>
        <LumoraButton variant="ghost">Cancel</LumoraButton>
        <LumoraButton variant="primary">Save</LumoraButton>
      </LumoraCard.Footer>
    </LumoraCard>
  );
}
```

Works with **Next.js 13+** (App or Pages router), **Vite + React**, **Remix**, **Astro + React**, and any setup that supports React 18+ or 19. Server Components are first-class — Lumora ships SSR-safe and zero client JS unless you use an interactive component.

**Components shipped:** `LumoraButton`, `LumoraButtonGroup`, `LumoraBadge`, `LumoraTag`, `LumoraAlert`, `LumoraToast`, `LumoraField`, `LumoraLabel`, `LumoraHint`, `LumoraInput`, `LumoraTextarea`, `LumoraSelect`, `LumoraCheckbox`, `LumoraRadio`, `LumoraSwitch`, `LumoraCard` (+ Header / Body / Footer / Title / Subtitle), `LumoraNavbar`, `LumoraSidebar`, `LumoraSidebarItem`, `LumoraBreadcrumbs`, `LumoraPagination`, `LumoraPaginationItem`, `LumoraDropdown`, `LumoraDropdownMenu`, `LumoraDropdownItem`, `LumoraModal`, `LumoraDrawer`, `LumoraTooltip`, `LumoraTable`, `LumoraAvatar`, `LumoraSkeleton`, `LumoraProgress`, `LumoraSpinner`, `LumoraDensityScope`, `cn` utility.

</details>

<details>
<summary><strong>Vue</strong> — slot-based component wrappers</summary>

### Install

```bash
pnpm add @lumora-design/core @lumora-design/vue
```

### Wire up Tailwind

```css
/* src/main.css */
@import "tailwindcss";
@plugin "@lumora-design/core";
```

```html
<!-- index.html -->
<html lang="en" data-lm-theme="lumora-dark">
  <head>
    <link rel="stylesheet" href="/src/main.css" />
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

### Use

```vue
<script setup lang="ts">
import {
  LumoraButton,
  LumoraCard,
  LumoraCardHeader,
  LumoraCardTitle,
  LumoraCardSubtitle,
  LumoraCardBody,
  LumoraCardFooter,
  LumoraField,
  LumoraLabel,
  LumoraInput
} from "@lumora-design/vue";
</script>

<template>
  <LumoraCard variant="raised">
    <LumoraCardHeader>
      <LumoraCardTitle>Account</LumoraCardTitle>
      <LumoraCardSubtitle>Plan and billing</LumoraCardSubtitle>
    </LumoraCardHeader>
    <LumoraCardBody>
      <LumoraField>
        <LumoraLabel>Workspace email</LumoraLabel>
        <LumoraInput size="md" placeholder="you@company.com" />
      </LumoraField>
    </LumoraCardBody>
    <LumoraCardFooter>
      <LumoraButton variant="ghost">Cancel</LumoraButton>
      <LumoraButton variant="primary">Save</LumoraButton>
    </LumoraCardFooter>
  </LumoraCard>
</template>
```

Works with **Vue 3.5+**, **Nuxt 3**, **Vite + Vue**, **Astro + Vue**. Component prop names mirror the React adapter exactly — switching frameworks doesn't mean re-learning the API.

</details>

---

## What's in the box

### 65 components, 11 categories

| Category       | Primitives                                                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Action**     | Button, Button group, Toggle group                                                                                                                   |
| **Form**       | Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Field, Calendar, Date picker, OTP, Combobox, Number input, Tag input, Color picker, Rating |
| **Display**    | Badge, Tag, Avatar, Avatar group, KBD, Code, Icon                                                                                                    |
| **Feedback**   | Alert, Toast, Banner, Progress, Spinner, Skeleton                                                                                                    |
| **Layout**     | Card, App shell, Divider                                                                                                                             |
| **Navigation** | Tabs, Segmented, Stepper, Breadcrumbs, Navbar, Sidebar, Pagination, Mega menu                                                                        |
| **Overlay**    | Modal, Drawer, Tooltip, Popover, Dropdown, Hover card, Context menu, Command palette                                                                 |
| **Disclosure** | Accordion, Tree                                                                                                                                      |
| **Data**       | Table, Stat, Sparkline, Timeline, Activity feed, Diff, Inbox, Empty                                                                                  |
| **Media**      | Carousel, Split pane, Chat, Mention, Rich-text toolbar, Scroll area                                                                                  |
| **Pattern**    | Command bar, Filter bar, Bulk action bar                                                                                                             |

### 39 WCAG-AA themes

**Light** &nbsp;·&nbsp; Lumora Light · Slate Boardroom · Cobalt Office · Solar · Aurora · Sunset · Mint · Berry · Ocean · Mocha · Pastel · Forest · Sand · Linen · Paper · Cream · Mist · Peach · Sage · Lilac

**Dark** &nbsp;·&nbsp; Lumora Dark · Graphite Command · Tokyo Night · Nord · Cobalt Night · Ember · Carbon · Solarized Dark · Midnight · Eclipse · Onyx · Slate Dark · Pine · Ruby · Plum · Gold · Steel · Pebble · Inkwell

Switch with one attribute — no rebuild needed:

```html
<html data-lm-theme="tokyo-night"></html>
```

Define your own theme in 12 lines — see the [theming guide](https://sitharaj88.github.io/lumora-design/docs/theming/).

### 6 production-ready templates

| Template            | Description                                                               | Routes        |
| ------------------- | ------------------------------------------------------------------------- | ------------- |
| **Admin Console**   | Multi-tenant SaaS admin with accounts, billing, audit log, settings       | 6 + 12 detail |
| **CRM**             | Pipeline, contacts, deals, activity, reports — Salesforce-class workflows | 6 + 14 detail |
| **Project Tracker** | Kanban board, backlog, sprint, roadmap, settings — Jira/Linear-style      | 5             |
| **E-commerce**      | Storefront, product, cart, checkout, orders                               | 5 + 8 detail  |
| **Marketing**       | Landing, features, pricing, blog, post — public-site primitives           | 5 + 4 posts   |
| **Analytics**       | Overview, funnels, cohorts, segments, reports — Mixpanel-style            | 5             |

Every template is wired to realistic mock data and uses only the public `lm-*` class contract — fork into your app and replace the data layer.

---

## Packages

| Package                                                                            | Description                                                                                    |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **[`@lumora-design/core`](https://www.npmjs.com/package/@lumora-design/core)**     | Tailwind v4 plugin and the complete `lm-*` class contract. The only required package.          |
| **[`@lumora-design/themes`](https://www.npmjs.com/package/@lumora-design/themes)** | Theme tokens, contrast helpers. Bundled by `core` — install only if you need the API directly. |
| **[`@lumora-design/react`](https://www.npmjs.com/package/@lumora-design/react)**   | React component wrappers. Optional — the class contract works in plain React.                  |
| **[`@lumora-design/vue`](https://www.npmjs.com/package/@lumora-design/vue)**       | Vue component wrappers. Optional — the class contract works in plain Vue.                      |

---

## How Lumora compares

|                                | Lumora UI | daisyUI |   shadcn/ui    | Mantine |
| ------------------------------ | :-------: | :-----: | :------------: | :-----: |
| Tailwind v4 native             |     ✓     | partial |       —        |    —    |
| Class-first (works without JS) |     ✓     |    ✓    |       —        |    —    |
| Themes via single attribute    |  ✓ (39)   | ✓ (35)  |       —        | partial |
| Built-in WCAG-AA verification  |     ✓     |    —    |       —        | partial |
| React adapter (typed)          |     ✓     |    —    | ✓ (copy-paste) |    ✓    |
| Vue adapter (typed)            |     ✓     |    —    |       —        |    —    |
| Multi-page templates           |   ✓ (6)   |    —    |       —        |    —    |
| Class contract is public API   |     ✓     |    ✓    |       —        |    —    |
| Zero runtime JS by default     |     ✓     |    ✓    |       ✓        |    —    |

---

## Documentation

- **[Installation](https://sitharaj88.github.io/lumora-design/docs/installation/)** — three-step setup for HTML, React, and Vue.
- **[Components](https://sitharaj88.github.io/lumora-design/components/)** — searchable catalog with live previews, framework code tabs, CSS class tables, props tables, and accessibility notes.
- **[Theming](https://sitharaj88.github.io/lumora-design/docs/theming/)** — token taxonomy, the `data-lm-theme` switch, and the contrast verification tooling.
- **[Tokens](https://sitharaj88.github.io/lumora-design/docs/tokens/)** — the full design token system.
- **[Templates](https://sitharaj88.github.io/lumora-design/templates/)** — six multi-page application templates with realistic data.
- **[API](https://sitharaj88.github.io/lumora-design/api/)** — typed props for the React adapter.
- **[Accessibility](https://sitharaj88.github.io/lumora-design/accessibility/)** — per-component a11y checklist.
- **[Migration](https://sitharaj88.github.io/lumora-design/docs/migration/)** — versioning policy and the 1.0 stability promise.

---

## Browser support

The latest two versions of Chrome, Firefox, Safari, and Edge. Tailwind v4 features (CSS cascade layers, `color-mix`, `oklab`) require **Chrome 111+**, **Safari 16.4+**, **Firefox 113+**, **Edge 111+**.

---

## Accessibility

- Every theme is **WCAG-AA verified** for foreground contrast on every semantic surface (background, surface, surface-raised, primary, success, warning, danger, info, accent).
- Every component ships with an **accessibility checklist** documented on its detail page.
- The cross-template audit (15 representative pages) runs **`@axe-core/playwright`** on every commit and asserts **zero serious or critical violations** under WCAG 2.1 AA + best-practice tags.
- The `lm-*` class contract is built around real semantic HTML — `<button>`, `<a>`, `<dialog>`, `<details>`, ARIA landmarks — never a `<div>` with a click handler.

---

## Development

<details>
<summary>Local setup</summary>

```bash
pnpm install
pnpm check       # lint + format + typecheck + build + tests
pnpm docs:dev    # build packages, then run the docs site
```

</details>

<details>
<summary>Quality gates</summary>

```bash
pnpm lint          # ESLint with --max-warnings=0
pnpm format:check  # Prettier
pnpm typecheck     # tsc --noEmit across all workspaces
pnpm build         # tsup builds for the four publishable packages
pnpm test          # Vitest unit tests
pnpm docs:build    # Next.js production build
pnpm test:visual   # Playwright smoke + a11y + visual regression
```

`pnpm check` runs the first five sequentially. CI runs the full set on every push.

</details>

<details>
<summary>Releases</summary>

```bash
pnpm changeset           # describe a release
pnpm changeset version   # apply pending changesets
pnpm release:check       # full pre-flight (check + docs + pack:dry)
pnpm release:dry         # build packages and pack tarballs locally
pnpm release             # publish to npm (used by CI)
```

The Release workflow runs only on manual dispatch — go to the **Actions** tab → **Release** → **Run workflow**.

</details>

---

## Contributing

PRs welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for the local setup, naming conventions for `lm-*` classes, and how to ship a changeset. By participating you agree to the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Security

Found a vulnerability? Please follow the disclosure process in [SECURITY.md](./SECURITY.md) — do not open a public issue.

---

## Maintainer

Built and maintained by **[Sitharaj Seenivasan](https://sitharaj.in)**.

|          |                                                         |
| -------- | ------------------------------------------------------- |
| Website  | [sitharaj.in](https://sitharaj.in)                      |
| GitHub   | [@sitharaj88](https://github.com/sitharaj88)            |
| LinkedIn | [in/sitharaj08](https://www.linkedin.com/in/sitharaj08) |
| npm      | [~sitharaj](https://www.npmjs.com/~sitharaj)            |

If Lumora UI saves your team time, [buy me a coffee](https://www.buymeacoffee.com/sitharaj88) or [sponsor on GitHub](https://github.com/sponsors/sitharaj88) — every cup keeps the themes contrast-checked and the templates shipping.

---

## License

[MIT](./LICENSE) — Copyright (c) 2026 [Sitharaj Seenivasan](https://sitharaj.in) and contributors.

<div align="center">

If Lumora UI helped you, please **[star the repo](https://github.com/sitharaj88/lumora-design)** — it's the easiest way to support the project.

</div>
