# @lumora-design/react

React wrappers for Lumora UI.

## Install

```bash
pnpm add @lumora-design/core @lumora-design/react
```

Make sure the core plugin is loaded in your Tailwind CSS entrypoint:

```css
@import "tailwindcss";
@plugin "@lumora-design/core";
```

## Usage

```tsx
import { LumoraButton, LumoraCard, LumoraInput } from "@lumora-design/react";

export function Example() {
  return (
    <LumoraCard>
      <LumoraCard.Header>
        <LumoraCard.Title>Account settings</LumoraCard.Title>
      </LumoraCard.Header>
      <LumoraCard.Body>
        <LumoraInput size="md" state="success" placeholder="Company email" />
      </LumoraCard.Body>
      <LumoraCard.Footer>
        <LumoraButton variant="primary" size="md">
          Save
        </LumoraButton>
      </LumoraCard.Footer>
    </LumoraCard>
  );
}
```

## Components

The package includes thin wrappers for:

- Actions and feedback: `LumoraButton`, `LumoraBadge`, `LumoraAlert`, `LumoraToast`
- Forms: `LumoraField`, `LumoraLabel`, `LumoraHint`, `LumoraInput`, `LumoraTextarea`, `LumoraSelect`, `LumoraCheckbox`, `LumoraRadio`, `LumoraSwitch`
- Layout and navigation: `LumoraCard`, `LumoraNavbar`, `LumoraSidebar`, `LumoraSidebarItem`, `LumoraBreadcrumbs`, `LumoraPagination`, `LumoraPaginationItem`
- Overlays: `LumoraDropdown`, `LumoraDropdownMenu`, `LumoraDropdownItem`, `LumoraModal`, `LumoraDrawer`, `LumoraTooltip`, `LumoraTooltipContent`
- Data display: `LumoraTable`, `LumoraAvatar`, `LumoraSkeleton`, `LumoraProgress`, `LumoraSpinner`
- Utilities: `LumoraDensityScope`, `cn`

Compound aliases are available for common structures:

```tsx
<LumoraModal aria-label="Confirm approval">
  <LumoraModal.Panel>
    <LumoraModal.Header>Confirm</LumoraModal.Header>
    <LumoraModal.Body>Approve this account?</LumoraModal.Body>
    <LumoraModal.Footer>
      <LumoraButton variant="primary">Approve</LumoraButton>
    </LumoraModal.Footer>
  </LumoraModal.Panel>
</LumoraModal>
```

React components are intentionally thin and emit the same `lm-*` classes documented by `@lumora-design/core`.
