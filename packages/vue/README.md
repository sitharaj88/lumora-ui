# @lumora-ui/vue

Beta Vue wrappers for Lumora UI.

## Install

```bash
pnpm add @lumora-ui/core @lumora-ui/vue
```

Make sure the core plugin is loaded in your Tailwind CSS entrypoint:

```css
@import "tailwindcss";
@plugin "@lumora-ui/core";
```

## Usage

```vue
<script setup lang="ts">
import {
  LumoraButton,
  LumoraCard,
  LumoraCardBody,
  LumoraCardFooter,
  LumoraCardHeader,
  LumoraCardTitle,
  LumoraInput
} from "@lumora-ui/vue";
</script>

<template>
  <LumoraCard>
    <LumoraCardHeader>
      <LumoraCardTitle>Account settings</LumoraCardTitle>
    </LumoraCardHeader>
    <LumoraCardBody>
      <LumoraInput size="md" state="success" placeholder="Company email" />
    </LumoraCardBody>
    <LumoraCardFooter>
      <LumoraButton variant="primary" size="md">Save</LumoraButton>
    </LumoraCardFooter>
  </LumoraCard>
</template>
```

## Components

The package includes slot-based wrappers for:

- Actions and feedback: `LumoraButton`, `LumoraBadge`, `LumoraAlert`, `LumoraToast`
- Forms: `LumoraField`, `LumoraLabel`, `LumoraHint`, `LumoraInput`, `LumoraTextarea`, `LumoraSelect`, `LumoraCheckbox`, `LumoraRadio`, `LumoraSwitch`
- Layout and navigation: `LumoraCard`, `LumoraNavbar`, `LumoraSidebar`, `LumoraSidebarItem`, `LumoraBreadcrumbs`, `LumoraPagination`, `LumoraPaginationItem`
- Overlays: `LumoraDropdown`, `LumoraDropdownMenu`, `LumoraDropdownItem`, `LumoraModal`, `LumoraDrawer`, `LumoraTooltip`, `LumoraTooltipContent`
- Data display: `LumoraTable`, `LumoraAvatar`, `LumoraSkeleton`, `LumoraProgress`, `LumoraSpinner`
- Utilities: `LumoraDensityScope`, `cn`

Vue components are intentionally thin and emit the same `lm-*` classes documented by `@lumora-ui/core`.
