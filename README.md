# Lumora UI

Lumora UI is an open-source, enterprise-focused Tailwind v4 design system with prefixed semantic classes, 20+ themes, and beta React/Vue adapters.

```css
@import "tailwindcss";
@plugin "@lumora-ui/core";
```

```html
<button class="lm-btn lm-btn-primary lm-btn-md">Save</button>
```

## Packages

- `@lumora-ui/core`: Tailwind plugin and `lm-*` component classes.
- `@lumora-ui/themes`: theme tokens and WCAG validation helpers.
- `@lumora-ui/react`: thin beta React wrappers.
- `@lumora-ui/vue`: thin beta Vue wrappers.
- `@lumora-ui/docs`: Next.js documentation and live component showcase.

## Development

```bash
pnpm install
pnpm check
pnpm docs:dev
```

## Quality gates

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm build
pnpm test
pnpm docs:build
```

`pnpm check` runs linting, formatting checks, type checks, package builds, and tests.

## Releases

Package versioning uses Changesets:

```bash
pnpm changeset
pnpm changeset version
pnpm release:check
pnpm release:dry
pnpm release
```

Before publishing, claim the npm organization scope `@lumora-ui`.
