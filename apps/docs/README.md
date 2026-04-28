# Lumora UI Docs

Next.js documentation site for Lumora UI.

## Development

```bash
pnpm --filter @lumora-ui/docs dev
```

## Build

```bash
pnpm --filter @lumora-ui/docs build
```

The docs app validates the real Tailwind usage path:

```css
@import "tailwindcss";
@plugin "@lumora-ui/core";
```
