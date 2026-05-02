# @lumora-design/core

Tailwind v4 plugin for Lumora UI.

## Install

```bash
pnpm add @lumora-design/core tailwindcss
```

```css
@import "tailwindcss";
@plugin "@lumora-design/core";
```

## Usage

```html
<button class="lm-btn lm-btn-primary lm-btn-md">Save changes</button>
<input class="lm-input" placeholder="Company email" />
```

## Component API

Lumora uses semantic base classes plus modifiers:

- Tones: `lm-btn-primary`, `lm-btn-secondary`, `lm-btn-accent`, `lm-btn-success`, `lm-btn-warning`, `lm-btn-info`, `lm-btn-danger`
- Sizes: `lm-btn-xs`, `lm-btn-sm`, `lm-btn-md`, `lm-btn-lg`
- States: `lm-btn-loading`, `lm-btn-active`, `aria-busy`, `aria-pressed`, `aria-expanded`, `aria-disabled`
- Forms: `lm-input-sm`, `lm-input-md`, `lm-input-lg`, `lm-input-success`, `lm-input-warning`, `lm-input-danger`
- Density: `lm-density-compact`, `lm-density-comfortable`, `lm-density-spacious`, or `data-lm-density`

```html
<section class="lm-density-compact">
  <button class="lm-btn lm-btn-success lm-btn-sm">Approve</button>
  <input class="lm-input lm-input-sm" aria-invalid="false" />
</section>
```

The plugin also accepts theme and density options when used from a Tailwind config:

```ts
import lumora from "@lumora-design/core";

export default {
  plugins: [lumora({ defaultDensity: "compact" })]
};
```

## Stability

The `lm-*` class contract is the foundation for all framework adapters. React and Vue packages should wrap these classes without introducing separate styling behavior.

## Accessibility

Lumora targets WCAG 2.2 AA. The package exports accessibility guidance for documented components:

```ts
import { lumoraAccessibilityGuidelines, lumoraAccessibilityTarget } from "@lumora-design/core";
```

The automated test suite validates representative markup with axe, verifies theme contrast separately, and locks reduced-motion base styles.
