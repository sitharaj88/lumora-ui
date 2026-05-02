# Changelog

All notable changes to Lumora UI will be documented here. The project follows
[Semantic Versioning](https://semver.org/) and uses Changesets for per-package
release notes.

## 1.0.0 — Initial public release

### Highlights

- 65 production-ready components covering Action, Form, Display, Feedback,
  Layout, Navigation, Overlay, Disclosure, Data, Media, and enterprise
  Pattern primitives.
- Stable `lm-*` class contract — every component is reachable from plain
  HTML with the Tailwind v4 plugin alone.
- 39 themes (20+ light, 18+ dark), each WCAG-AA verified for foreground
  contrast on every semantic surface.
- React (`@lumora-ui/react`) and Vue (`@lumora-ui/vue`) adapters that wrap
  the same class contract — drop in or stay on plain HTML.
- 6 multi-page enterprise templates (Admin Console, CRM, Project tracker,
  E-commerce, Marketing, Analytics) with realistic sample data and 70+
  preview routes.
- Full documentation site with searchable component catalog, per-component
  live preview, framework code samples, CSS class tables, props tables,
  and accessibility notes.
- Visual regression suite: 14 template baselines × desktop + mobile, plus
  a theme matrix that re-renders the admin and marketing surfaces under
  light, dark, and graphite.
- Cross-template a11y audit using `@axe-core/playwright` covering 15
  representative pages — zero serious or critical violations under
  WCAG 2.1 AA + best-practice tags.

### Packages

- **@lumora-ui/core 1.0.0** — Tailwind v4 plugin and the complete `lm-*`
  component class contract.
- **@lumora-ui/themes 1.0.0** — 39 themes with required token exports.
- **@lumora-ui/react 1.0.0** — React component wrappers and behavior
  helpers around the same class contract.
- **@lumora-ui/vue 1.0.0** — Vue component wrappers and helpers.

### Quality

- 24 unit tests (themes / core / React / Vue / accessibility) — green.
- 47 Playwright smoke + a11y tests — green.
- 26 visual + theme matrix screenshots — stable baselines committed.
- 154 statically-generated docs pages, including all 70+ template
  preview routes.
