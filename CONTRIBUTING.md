# Contributing

Thanks for helping build Lumora UI. This project prioritizes stable public APIs, accessibility, and predictable enterprise behavior.

## Local setup

```bash
pnpm install
pnpm check
pnpm docs:dev
```

## Development rules

- Keep styling behavior in `@lumora-ui/core`; React and Vue packages should remain thin wrappers.
- Use the public `lm-*` class contract for examples and adapter output.
- Add or update tests when changing tokens, component classes, or adapter props.
- Keep themes WCAG AA for the tested foreground/background pairs.
- Do not introduce breaking public class names without a changeset and migration note.

## Changesets

For package changes intended for release:

```bash
pnpm changeset
```

Use patch changes for fixes and compatible additions, minor changes for new components or APIs, and major changes only after a documented breaking-change decision.
