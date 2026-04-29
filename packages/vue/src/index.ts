import { type PropType, type Slots, type VNode, defineComponent, h } from "vue";

export type LumoraSize = "xs" | "sm" | "md" | "lg" | "xl";
export type LumoraControlSize = "sm" | "md" | "lg";
export type LumoraTone =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "info"
  | "danger"
  | "ghost"
  | "outline";
export type LumoraStatus = "info" | "success" | "warning" | "danger";
export type LumoraDensity = "compact" | "comfortable" | "spacious";

type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}

function attrClass(attrs: Record<string, unknown>) {
  return attrs.class as string | undefined;
}

function slot(slots: Slots): VNode[] | undefined {
  return slots.default?.();
}

const controlSizeProp = {
  type: String as PropType<LumoraControlSize>,
  default: undefined
};

export const LumoraButton = defineComponent({
  name: "LumoraButton",
  props: {
    variant: { type: String as PropType<LumoraTone>, default: "primary" },
    size: { type: String as PropType<Exclude<LumoraSize, "xl">>, default: "md" },
    loading: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    iconOnly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          ...attrs,
          class: cn(
            "lm-btn",
            `lm-btn-${props.variant}`,
            `lm-btn-${props.size}`,
            props.loading && "lm-btn-loading",
            props.active && "lm-btn-active",
            props.iconOnly && "lm-btn-icon",
            attrClass(attrs)
          ),
          disabled: props.disabled || props.loading,
          "aria-busy": props.loading || attrs["aria-busy"] || undefined
        },
        slot(slots)
      );
  }
});

export const LumoraBadge = defineComponent({
  name: "LumoraBadge",
  props: {
    variant: { type: String, default: "neutral" },
    size: controlSizeProp
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "span",
        {
          ...attrs,
          class: cn(
            "lm-badge",
            props.variant !== "neutral" && `lm-badge-${props.variant}`,
            props.size && `lm-badge-${props.size}`,
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});

export const LumoraAlert = defineComponent({
  name: "LumoraAlert",
  props: {
    status: { type: String as PropType<LumoraStatus>, default: "info" }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          role: "status",
          ...attrs,
          class: cn("lm-alert", `lm-alert-${props.status}`, attrClass(attrs))
        },
        slot(slots)
      );
  }
});

export const LumoraCard = defineComponent({
  name: "LumoraCard",
  props: {
    variant: { type: String, default: "default" }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          class: cn(
            "lm-card",
            props.variant !== "default" && `lm-card-${props.variant}`,
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});

export const LumoraCardHeader = defineComponent({
  name: "LumoraCardHeader",
  setup(_, { attrs, slots }) {
    return () => h("div", { ...attrs, class: cn("lm-card-header", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraCardBody = defineComponent({
  name: "LumoraCardBody",
  setup(_, { attrs, slots }) {
    return () => h("div", { ...attrs, class: cn("lm-card-body", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraCardFooter = defineComponent({
  name: "LumoraCardFooter",
  setup(_, { attrs, slots }) {
    return () => h("div", { ...attrs, class: cn("lm-card-footer", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraCardTitle = defineComponent({
  name: "LumoraCardTitle",
  setup(_, { attrs, slots }) {
    return () => h("h3", { ...attrs, class: cn("lm-card-title", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraField = defineComponent({
  name: "LumoraField",
  setup(_, { attrs, slots }) {
    return () => h("label", { ...attrs, class: cn("lm-field", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraLabel = defineComponent({
  name: "LumoraLabel",
  setup(_, { attrs, slots }) {
    return () => h("span", { ...attrs, class: cn("lm-label", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraHint = defineComponent({
  name: "LumoraHint",
  setup(_, { attrs, slots }) {
    return () => h("span", { ...attrs, class: cn("lm-hint", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraInput = defineComponent({
  name: "LumoraInput",
  props: {
    invalid: { type: Boolean, default: false },
    size: controlSizeProp,
    state: { type: String as PropType<"success" | "warning" | "danger">, default: undefined }
  },
  setup(props, { attrs }) {
    return () =>
      h("input", {
        ...attrs,
        class: cn(
          "lm-input",
          props.size && `lm-input-${props.size}`,
          props.state && `lm-input-${props.state}`,
          attrClass(attrs)
        ),
        "aria-invalid": props.invalid || attrs["aria-invalid"] || undefined
      });
  }
});

export const LumoraTextarea = defineComponent({
  name: "LumoraTextarea",
  props: {
    invalid: { type: Boolean, default: false },
    state: { type: String as PropType<"success" | "warning" | "danger">, default: undefined }
  },
  setup(props, { attrs }) {
    return () =>
      h("textarea", {
        ...attrs,
        class: cn("lm-textarea", props.state && `lm-textarea-${props.state}`, attrClass(attrs)),
        "aria-invalid": props.invalid || attrs["aria-invalid"] || undefined
      });
  }
});

export const LumoraSelect = defineComponent({
  name: "LumoraSelect",
  props: {
    invalid: { type: Boolean, default: false },
    size: controlSizeProp,
    state: { type: String as PropType<"success" | "warning" | "danger">, default: undefined }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "select",
        {
          ...attrs,
          class: cn(
            "lm-select",
            props.size && `lm-select-${props.size}`,
            props.state && `lm-select-${props.state}`,
            attrClass(attrs)
          ),
          "aria-invalid": props.invalid || attrs["aria-invalid"] || undefined
        },
        slot(slots)
      );
  }
});

export const LumoraCheckbox = defineComponent({
  name: "LumoraCheckbox",
  props: { size: controlSizeProp },
  setup(props, { attrs }) {
    return () =>
      h("input", {
        ...attrs,
        type: "checkbox",
        class: cn("lm-checkbox", props.size && `lm-checkbox-${props.size}`, attrClass(attrs))
      });
  }
});

export const LumoraRadio = defineComponent({
  name: "LumoraRadio",
  props: { size: controlSizeProp },
  setup(props, { attrs }) {
    return () =>
      h("input", {
        ...attrs,
        type: "radio",
        class: cn("lm-radio", props.size && `lm-radio-${props.size}`, attrClass(attrs))
      });
  }
});

export const LumoraSwitch = defineComponent({
  name: "LumoraSwitch",
  props: { size: controlSizeProp },
  setup(props, { attrs }) {
    return () =>
      h("input", {
        ...attrs,
        type: "checkbox",
        role: attrs.role ?? "switch",
        class: cn("lm-switch", props.size && `lm-switch-${props.size}`, attrClass(attrs))
      });
  }
});

export const LumoraTabs = defineComponent({
  name: "LumoraTabs",
  setup(_, { attrs, slots }) {
    return () =>
      h(
        "div",
        { ...attrs, role: attrs.role ?? "tablist", class: cn("lm-tabs", attrClass(attrs)) },
        slot(slots)
      );
  }
});

export const LumoraTab = defineComponent({
  name: "LumoraTab",
  props: {
    active: { type: Boolean, default: false },
    size: controlSizeProp
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          ...attrs,
          role: attrs.role ?? "tab",
          class: cn(
            "lm-tab",
            props.active && "lm-tab-active",
            props.size && `lm-tab-${props.size}`,
            attrClass(attrs)
          ),
          "aria-selected": props.active || attrs["aria-selected"] || undefined
        },
        slot(slots)
      );
  }
});

export const LumoraDropdown = defineComponent({
  name: "LumoraDropdown",
  setup(_, { attrs, slots }) {
    return () => h("div", { ...attrs, class: cn("lm-dropdown", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraDropdownMenu = defineComponent({
  name: "LumoraDropdownMenu",
  setup(_, { attrs, slots }) {
    return () =>
      h(
        "div",
        { ...attrs, role: attrs.role ?? "menu", class: cn("lm-dropdown-menu", attrClass(attrs)) },
        slot(slots)
      );
  }
});

export const LumoraDropdownItem = defineComponent({
  name: "LumoraDropdownItem",
  props: {
    active: { type: Boolean, default: false }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          ...attrs,
          role: attrs.role ?? "menuitem",
          class: cn("lm-dropdown-item", props.active && "lm-dropdown-item-active", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

export const LumoraModal = defineComponent({
  name: "LumoraModal",
  props: {
    open: { type: Boolean, default: true },
    size: { type: String, default: undefined }
  },
  setup(props, { attrs, slots }) {
    return () =>
      props.open
        ? h(
            "div",
            {
              ...attrs,
              role: attrs.role ?? "dialog",
              "aria-modal": "true",
              class: cn("lm-modal", props.size && `lm-modal-${props.size}`, attrClass(attrs))
            },
            slot(slots)
          )
        : null;
  }
});

export const LumoraModalPanel = defineComponent({
  name: "LumoraModalPanel",
  props: { size: { type: String, default: undefined } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          class: cn(
            "lm-modal-panel",
            props.size && `lm-modal-panel-${props.size}`,
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});

export const LumoraModalHeader = defineComponent({
  name: "LumoraModalHeader",
  setup(_, { attrs, slots }) {
    return () =>
      h("div", { ...attrs, class: cn("lm-modal-header", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraModalBody = defineComponent({
  name: "LumoraModalBody",
  setup(_, { attrs, slots }) {
    return () => h("div", { ...attrs, class: cn("lm-modal-body", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraModalFooter = defineComponent({
  name: "LumoraModalFooter",
  setup(_, { attrs, slots }) {
    return () =>
      h("div", { ...attrs, class: cn("lm-modal-footer", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraDrawer = defineComponent({
  name: "LumoraDrawer",
  props: {
    open: { type: Boolean, default: true },
    side: { type: String as PropType<"left" | "right">, default: "right" },
    size: controlSizeProp
  },
  setup(props, { attrs, slots }) {
    return () =>
      props.open
        ? h(
            "aside",
            {
              ...attrs,
              role: attrs.role ?? "dialog",
              class: cn(
                "lm-drawer",
                props.side === "left" && "lm-drawer-left",
                props.size && `lm-drawer-${props.size}`,
                attrClass(attrs)
              )
            },
            slot(slots)
          )
        : null;
  }
});

export const LumoraTooltip = defineComponent({
  name: "LumoraTooltip",
  setup(_, { attrs, slots }) {
    return () => h("span", { ...attrs, class: cn("lm-tooltip", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraTooltipContent = defineComponent({
  name: "LumoraTooltipContent",
  props: {
    side: { type: String as PropType<"top" | "right" | "bottom" | "left">, default: undefined }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          role: attrs.role ?? "tooltip",
          "data-side": props.side,
          class: cn("lm-tooltip-content", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

export const LumoraToast = defineComponent({
  name: "LumoraToast",
  props: {
    status: { type: String as PropType<LumoraStatus>, default: undefined },
    size: controlSizeProp
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          role: attrs.role ?? "status",
          ...attrs,
          class: cn(
            "lm-toast",
            props.status && `lm-toast-${props.status}`,
            props.size && `lm-toast-${props.size}`,
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});

export const LumoraAvatar = defineComponent({
  name: "LumoraAvatar",
  props: {
    size: { type: String as PropType<LumoraSize>, default: "md" }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        { ...attrs, class: cn("lm-avatar", `lm-avatar-${props.size}`, attrClass(attrs)) },
        slot(slots)
      );
  }
});

export const LumoraBreadcrumbs = defineComponent({
  name: "LumoraBreadcrumbs",
  setup(_, { attrs, slots }) {
    return () =>
      h(
        "nav",
        {
          ...attrs,
          "aria-label": attrs["aria-label"] ?? "Breadcrumb",
          class: cn("lm-breadcrumbs", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

export const LumoraPagination = defineComponent({
  name: "LumoraPagination",
  props: { size: controlSizeProp },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "nav",
        {
          ...attrs,
          "aria-label": attrs["aria-label"] ?? "Pagination",
          class: cn("lm-pagination", props.size && `lm-pagination-${props.size}`, attrClass(attrs))
        },
        slot(slots)
      );
  }
});

export const LumoraPaginationItem = defineComponent({
  name: "LumoraPaginationItem",
  props: {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: controlSizeProp
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "a",
        {
          ...attrs,
          class: cn(
            "lm-pagination-item",
            props.active && "lm-pagination-active",
            props.disabled && "lm-pagination-disabled",
            props.size && `lm-pagination-item-${props.size}`,
            attrClass(attrs)
          ),
          "aria-current": props.active ? "page" : attrs["aria-current"],
          "aria-disabled": props.disabled || attrs["aria-disabled"] || undefined
        },
        slot(slots)
      );
  }
});

export const LumoraNavbar = defineComponent({
  name: "LumoraNavbar",
  setup(_, { attrs, slots }) {
    return () => h("nav", { ...attrs, class: cn("lm-navbar", attrClass(attrs)) }, slot(slots));
  }
});

export const LumoraSidebar = defineComponent({
  name: "LumoraSidebar",
  props: {
    compact: { type: Boolean, default: false }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "aside",
        {
          ...attrs,
          class: cn("lm-sidebar", props.compact && "lm-sidebar-compact", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

export const LumoraSidebarItem = defineComponent({
  name: "LumoraSidebarItem",
  props: {
    active: { type: Boolean, default: false }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "a",
        {
          ...attrs,
          class: cn("lm-sidebar-item", props.active && "lm-sidebar-item-active", attrClass(attrs)),
          "aria-current": props.active ? "page" : attrs["aria-current"]
        },
        slot(slots)
      );
  }
});

export const LumoraTable = defineComponent({
  name: "LumoraTable",
  props: {
    striped: { type: Boolean, default: false },
    density: { type: String as PropType<"compact" | "default" | "spacious">, default: "default" }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "table",
        {
          ...attrs,
          class: cn(
            "lm-table",
            props.striped && "lm-table-striped",
            props.density === "compact" && "lm-table-compact",
            props.density === "spacious" && "lm-table-spacious",
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});

export const LumoraTableHeader = defineComponent({
  name: "LumoraTableHeader",
  setup(_, { attrs, slots }) {
    return () => h("thead", attrs, slot(slots));
  }
});

export const LumoraTableBody = defineComponent({
  name: "LumoraTableBody",
  setup(_, { attrs, slots }) {
    return () => h("tbody", attrs, slot(slots));
  }
});

export const LumoraTableRow = defineComponent({
  name: "LumoraTableRow",
  setup(_, { attrs, slots }) {
    return () => h("tr", attrs, slot(slots));
  }
});

export const LumoraTableHead = defineComponent({
  name: "LumoraTableHead",
  setup(_, { attrs, slots }) {
    return () => h("th", { scope: attrs.scope ?? "col", ...attrs }, slot(slots));
  }
});

export const LumoraTableCell = defineComponent({
  name: "LumoraTableCell",
  setup(_, { attrs, slots }) {
    return () => h("td", attrs, slot(slots));
  }
});

export const LumoraSkeleton = defineComponent({
  name: "LumoraSkeleton",
  props: {
    shape: { type: String as PropType<"block" | "circle" | "text">, default: "block" }
  },
  setup(props, { attrs }) {
    return () =>
      h("div", {
        ...attrs,
        "aria-hidden": "true",
        class: cn(
          "lm-skeleton",
          props.shape !== "block" && `lm-skeleton-${props.shape}`,
          attrClass(attrs)
        )
      });
  }
});

export const LumoraProgress = defineComponent({
  name: "LumoraProgress",
  props: { size: controlSizeProp },
  setup(props, { attrs }) {
    return () =>
      h("progress", {
        ...attrs,
        class: cn("lm-progress", props.size && `lm-progress-${props.size}`, attrClass(attrs))
      });
  }
});

export const LumoraSpinner = defineComponent({
  name: "LumoraSpinner",
  props: { size: controlSizeProp },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "span",
        {
          role: attrs.role ?? "status",
          ...attrs,
          class: cn("lm-spinner", props.size && `lm-spinner-${props.size}`, attrClass(attrs))
        },
        slot(slots)
      );
  }
});

export const LumoraDensityScope = defineComponent({
  name: "LumoraDensityScope",
  props: {
    density: { type: String as PropType<LumoraDensity>, default: "comfortable" }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        { ...attrs, class: cn(`lm-density-${props.density}`, attrClass(attrs)) },
        slot(slots)
      );
  }
});

// ============================================================
// v0.2 — additive components
// ============================================================

// Helper for the common "tag + class + slot" pattern.
function simple(name: string, tag: string, baseClass: string, role?: string) {
  return defineComponent({
    name,
    setup(_props, { attrs, slots }) {
      return () =>
        h(
          tag,
          { role, ...attrs, class: cn(baseClass, attrClass(attrs)) },
          slot(slots)
        );
    }
  });
}

// -- Button group / Toggle group / Segmented -----------------------
export const LumoraButtonGroup = simple("LumoraButtonGroup", "div", "lm-btn-group", "group");

export const LumoraToggleGroup = simple("LumoraToggleGroup", "div", "lm-toggle-group", "radiogroup");
export const LumoraToggleGroupItem = defineComponent({
  name: "LumoraToggleGroupItem",
  props: { pressed: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": props.pressed,
          "aria-pressed": props.pressed,
          ...attrs,
          class: cn("lm-toggle-group-item", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

export const LumoraSegmented = simple("LumoraSegmented", "div", "lm-segmented", "radiogroup");
export const LumoraSegmentedItem = defineComponent({
  name: "LumoraSegmentedItem",
  props: { pressed: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": props.pressed,
          "aria-pressed": props.pressed,
          ...attrs,
          class: cn("lm-segmented-item", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Tag / Tag input -----------------------------------------------
export const LumoraTag = defineComponent({
  name: "LumoraTag",
  props: {
    removable: { type: Boolean, default: false }
  },
  emits: ["remove"],
  setup(props, { attrs, slots, emit }) {
    return () =>
      h(
        "span",
        {
          ...attrs,
          class: cn("lm-tag", props.removable && "lm-tag-removable", attrClass(attrs))
        },
        [
          slot(slots),
          props.removable
            ? h(
                "button",
                {
                  type: "button",
                  class: "lm-tag-remove",
                  "aria-label": "Remove tag",
                  onClick: () => emit("remove")
                },
                "×"
              )
            : null
        ]
      );
  }
});
export const LumoraTagInput = simple("LumoraTagInput", "div", "lm-tag-input");

// -- Slider --------------------------------------------------------
export const LumoraSlider = defineComponent({
  name: "LumoraSlider",
  setup(_props, { attrs }) {
    return () =>
      h("input", {
        type: "range",
        ...attrs,
        class: cn("lm-slider", attrClass(attrs))
      });
  }
});

// -- Rating --------------------------------------------------------
export const LumoraRating = defineComponent({
  name: "LumoraRating",
  props: {
    value: { type: Number, default: 0 },
    max: { type: Number, default: 5 }
  },
  emits: ["update:value"],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        "div",
        {
          role: "radiogroup",
          "aria-label": (attrs["aria-label"] as string) ?? "Rating",
          ...attrs,
          class: cn("lm-rating", attrClass(attrs))
        },
        Array.from({ length: props.max }, (_, i) =>
          h(
            "button",
            {
              key: i,
              type: "button",
              role: "radio",
              "aria-checked": i < props.value,
              class: "lm-rating-star",
              onClick: () => emit("update:value", i + 1)
            },
            "★"
          )
        )
      );
  }
});

// -- Dropzone ------------------------------------------------------
export const LumoraDropzone = simple("LumoraDropzone", "label", "lm-dropzone");

// -- Kbd / Code / Code block --------------------------------------
export const LumoraKbd = simple("LumoraKbd", "kbd", "lm-kbd");
export const LumoraCode = simple("LumoraCode", "code", "lm-code");
export const LumoraCodeBlock = simple("LumoraCodeBlock", "pre", "lm-code-block");

// -- Banner --------------------------------------------------------
export const LumoraBanner = defineComponent({
  name: "LumoraBanner",
  props: { tone: { type: String as PropType<LumoraStatus>, default: undefined } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          role: "status",
          ...attrs,
          class: cn("lm-banner", props.tone && `lm-banner-${props.tone}`, attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Stat / Stat grid / Description list ---------------------------
export const LumoraStatGrid = simple("LumoraStatGrid", "div", "lm-stat-grid");
export const LumoraStat = simple("LumoraStat", "div", "lm-stat");
export const LumoraStatLabel = simple("LumoraStatLabel", "span", "lm-stat-label");
export const LumoraStatValue = simple("LumoraStatValue", "span", "lm-stat-value");
export const LumoraStatTrend = defineComponent({
  name: "LumoraStatTrend",
  props: { direction: { type: String as PropType<"up" | "down">, default: undefined } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "span",
        {
          ...attrs,
          class: cn(
            "lm-stat-trend",
            props.direction === "up" && "lm-stat-trend-up",
            props.direction === "down" && "lm-stat-trend-down",
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});

export const LumoraDescriptionList = simple("LumoraDescriptionList", "dl", "lm-description-list");

// -- Activity feed / Timeline --------------------------------------
export const LumoraActivityFeed = simple("LumoraActivityFeed", "ul", "lm-activity-feed");
export const LumoraActivityItem = simple("LumoraActivityItem", "li", "lm-activity-item");
export const LumoraTimeline = simple("LumoraTimeline", "ul", "lm-timeline");
export const LumoraTimelineItem = defineComponent({
  name: "LumoraTimelineItem",
  setup(_props, { attrs, slots }) {
    return () =>
      h(
        "li",
        { ...attrs, class: cn("lm-timeline-item", attrClass(attrs)) },
        [h("span", { class: "lm-timeline-dot", "aria-hidden": "true" }), slot(slots)]
      );
  }
});

// -- Empty state ---------------------------------------------------
export const LumoraEmptyState = simple("LumoraEmptyState", "div", "lm-empty-state");

// -- Accordion -----------------------------------------------------
export const LumoraAccordion = simple("LumoraAccordion", "div", "lm-accordion");
export const LumoraAccordionItem = simple("LumoraAccordionItem", "div", "lm-accordion-item");
export const LumoraAccordionTrigger = defineComponent({
  name: "LumoraAccordionTrigger",
  props: { expanded: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          "aria-expanded": props.expanded,
          ...attrs,
          class: cn("lm-accordion-trigger", attrClass(attrs))
        },
        slot(slots)
      );
  }
});
export const LumoraAccordionContent = defineComponent({
  name: "LumoraAccordionContent",
  props: { open: { type: Boolean, default: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          role: "region",
          hidden: !props.open || undefined,
          ...attrs,
          class: cn("lm-accordion-content", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Tree ----------------------------------------------------------
export const LumoraTree = simple("LumoraTree", "ul", "lm-tree", "tree");
export const LumoraTreeItem = defineComponent({
  name: "LumoraTreeItem",
  props: { selected: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          role: "treeitem",
          "aria-selected": props.selected,
          ...attrs,
          class: cn("lm-tree-item", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Stepper -------------------------------------------------------
export const LumoraStepper = simple("LumoraStepper", "ol", "lm-stepper");
export const LumoraStep = defineComponent({
  name: "LumoraStep",
  props: {
    state: {
      type: String as PropType<"complete" | "current" | "pending">,
      default: undefined
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "li",
        {
          "aria-current": props.state === "current" ? "step" : undefined,
          "data-state": props.state === "complete" ? "complete" : undefined,
          ...attrs,
          class: cn("lm-step", props.state === "complete" && "lm-step-complete", attrClass(attrs))
        },
        [h("span", { class: "lm-step-marker" }), slot(slots)]
      );
  }
});

// -- Popover -------------------------------------------------------
export const LumoraPopover = simple("LumoraPopover", "span", "lm-popover");
export const LumoraPopoverContent = defineComponent({
  name: "LumoraPopoverContent",
  props: {
    side: {
      type: String as PropType<"top" | "right" | "bottom" | "left">,
      default: undefined
    },
    open: { type: Boolean, default: true }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          role: "dialog",
          "data-side": props.side,
          "data-state": props.open ? "open" : "closed",
          hidden: !props.open || undefined,
          ...attrs,
          class: cn("lm-popover-content", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Hover card ----------------------------------------------------
export const LumoraHoverCard = simple("LumoraHoverCard", "span", "lm-hover-card");
export const LumoraHoverCardContent = defineComponent({
  name: "LumoraHoverCardContent",
  props: { open: { type: Boolean, default: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          hidden: !props.open || undefined,
          ...attrs,
          class: cn("lm-hover-card-content", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Context menu --------------------------------------------------
export const LumoraContextMenu = defineComponent({
  name: "LumoraContextMenu",
  props: {
    x: { type: Number, default: undefined },
    y: { type: Number, default: undefined }
  },
  setup(props, { attrs, slots }) {
    const positioned =
      props.x !== undefined && props.y !== undefined ? { top: props.y, left: props.x } : null;
    return () =>
      h(
        "div",
        {
          role: "menu",
          ...attrs,
          class: cn("lm-context-menu", attrClass(attrs)),
          style: positioned ? { ...((attrs.style as object) ?? {}), ...positioned } : attrs.style
        },
        slot(slots)
      );
  }
});
export const LumoraContextMenuItem = defineComponent({
  name: "LumoraContextMenuItem",
  props: { tone: { type: String as PropType<"default" | "danger">, default: "default" } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          role: "menuitem",
          ...attrs,
          class: cn(
            "lm-context-menu-item",
            props.tone === "danger" && "lm-context-menu-item-danger",
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});

// -- Command palette -----------------------------------------------
export const LumoraCommand = simple("LumoraCommand", "div", "lm-command");
export const LumoraCommandInput = defineComponent({
  name: "LumoraCommandInput",
  setup(_props, { attrs }) {
    return () =>
      h("input", {
        role: "combobox",
        "aria-autocomplete": "list",
        ...attrs,
        class: cn("lm-command-input", attrClass(attrs))
      });
  }
});
export const LumoraCommandList = simple("LumoraCommandList", "ul", "lm-command-list", "listbox");
export const LumoraCommandItem = defineComponent({
  name: "LumoraCommandItem",
  props: { selected: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "li",
        {
          role: "option",
          "aria-selected": props.selected,
          ...attrs,
          class: cn("lm-command-item", attrClass(attrs))
        },
        slot(slots)
      );
  }
});
export const LumoraCommandGroupLabel = simple(
  "LumoraCommandGroupLabel",
  "li",
  "lm-command-group-label"
);
export const LumoraCommandFooter = simple("LumoraCommandFooter", "div", "lm-command-footer");

// -- Calendar / Date picker ----------------------------------------
export const LumoraCalendar = simple("LumoraCalendar", "div", "lm-calendar", "grid");
export const LumoraCalendarHeader = simple("LumoraCalendarHeader", "div", "lm-calendar-header");
export const LumoraCalendarGrid = simple("LumoraCalendarGrid", "div", "lm-calendar-grid");
export const LumoraCalendarDay = defineComponent({
  name: "LumoraCalendarDay",
  props: {
    selected: { type: Boolean, default: false },
    today: { type: Boolean, default: false },
    outside: { type: Boolean, default: false },
    range: { type: String as PropType<"start" | "middle" | "end">, default: undefined }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          role: "gridcell",
          "aria-selected": props.selected,
          "data-today": props.today ? "true" : undefined,
          "data-outside": props.outside ? "true" : undefined,
          "data-range": props.range,
          ...attrs,
          class: cn("lm-calendar-day", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

export const LumoraDatePicker = simple("LumoraDatePicker", "div", "lm-datepicker");
export const LumoraDatePickerTrigger = defineComponent({
  name: "LumoraDatePickerTrigger",
  setup(_props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          "aria-haspopup": "dialog",
          ...attrs,
          class: cn("lm-datepicker-trigger", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Combobox ------------------------------------------------------
export const LumoraCombobox = simple("LumoraCombobox", "div", "lm-combobox");
export const LumoraComboboxListbox = defineComponent({
  name: "LumoraComboboxListbox",
  props: { open: { type: Boolean, default: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "ul",
        {
          role: "listbox",
          hidden: !props.open || undefined,
          ...attrs,
          class: cn("lm-combobox-listbox", attrClass(attrs))
        },
        slot(slots)
      );
  }
});
export const LumoraComboboxOption = defineComponent({
  name: "LumoraComboboxOption",
  props: { selected: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "li",
        {
          role: "option",
          "aria-selected": props.selected,
          ...attrs,
          class: cn("lm-combobox-option", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- OTP / Number input --------------------------------------------
export const LumoraOtp = simple("LumoraOtp", "div", "lm-otp");
export const LumoraOtpSlot = defineComponent({
  name: "LumoraOtpSlot",
  props: {
    filled: { type: Boolean, default: false },
    maxlength: { type: Number, default: 1 }
  },
  setup(props, { attrs }) {
    return () =>
      h("input", {
        maxlength: props.maxlength,
        "data-state": props.filled ? "filled" : undefined,
        ...attrs,
        class: cn("lm-otp-slot", attrClass(attrs))
      });
  }
});

export const LumoraNumberInput = defineComponent({
  name: "LumoraNumberInput",
  emits: ["increment", "decrement"],
  setup(_props, { attrs, emit }) {
    return () =>
      h(
        "div",
        { class: cn("lm-number-input", attrClass(attrs)) },
        [
          h(
            "button",
            { type: "button", "aria-label": "Decrement", onClick: () => emit("decrement") },
            "−"
          ),
          h("input", { type: "number", inputmode: "numeric", ...attrs }),
          h(
            "button",
            { type: "button", "aria-label": "Increment", onClick: () => emit("increment") },
            "+"
          )
        ]
      );
  }
});

// -- Carousel ------------------------------------------------------
export const LumoraCarousel = defineComponent({
  name: "LumoraCarousel",
  setup(_props, { attrs, slots }) {
    return () =>
      h(
        "section",
        {
          role: "region",
          "aria-roledescription": "carousel",
          ...attrs,
          class: cn("lm-carousel", attrClass(attrs))
        },
        slot(slots)
      );
  }
});
export const LumoraCarouselTrack = simple("LumoraCarouselTrack", "div", "lm-carousel-track");
export const LumoraCarouselItem = simple("LumoraCarouselItem", "div", "lm-carousel-item");
export const LumoraCarouselDots = simple("LumoraCarouselDots", "div", "lm-carousel-dots");
export const LumoraCarouselDot = defineComponent({
  name: "LumoraCarouselDot",
  props: { selected: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          "aria-selected": props.selected,
          ...attrs,
          class: cn("lm-carousel-dot", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Split pane ----------------------------------------------------
export const LumoraSplit = defineComponent({
  name: "LumoraSplit",
  props: {
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal"
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          class: cn(
            "lm-split",
            props.orientation === "vertical" && "lm-split-vertical",
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});
export const LumoraSplitHandle = defineComponent({
  name: "LumoraSplitHandle",
  props: {
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "vertical"
    }
  },
  setup(props, { attrs }) {
    return () =>
      h("div", {
        role: "separator",
        "aria-orientation": props.orientation,
        ...attrs,
        class: cn("lm-split-handle", attrClass(attrs))
      });
  }
});

// -- Diff ----------------------------------------------------------
export const LumoraDiff = simple("LumoraDiff", "div", "lm-diff");
export const LumoraDiffLine = defineComponent({
  name: "LumoraDiffLine",
  props: {
    variant: {
      type: String as PropType<"context" | "add" | "remove" | "meta">,
      default: "context"
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          class: cn(
            "lm-diff-line",
            props.variant === "add" && "lm-diff-line-add",
            props.variant === "remove" && "lm-diff-line-remove",
            props.variant === "meta" && "lm-diff-line-meta",
            attrClass(attrs)
          )
        },
        [h("span", { "aria-hidden": "true" }), h("span", null, slot(slots))]
      );
  }
});

// -- Sparkline -----------------------------------------------------
export const LumoraSparkline = defineComponent({
  name: "LumoraSparkline",
  props: {
    values: { type: Array as PropType<number[]>, required: true },
    showArea: { type: Boolean, default: true }
  },
  setup(props, { attrs }) {
    return () => {
      const values = props.values;
      if (values.length < 2) return null;
      const max = Math.max(...values);
      const min = Math.min(...values);
      const range = max - min || 1;
      const w = 100;
      const dh = 30;
      const points = values
        .map((v, i) => {
          const x = (i / (values.length - 1)) * w;
          const y = dh - ((v - min) / range) * (dh - 4) - 2;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
      const linePath = `M ${points.split(" ").join(" L ")}`;
      const areaPath = `M 0,${dh} L ${points.split(" ").join(" L ")} L ${w},${dh} Z`;
      return h(
        "svg",
        {
          viewBox: "0 0 100 30",
          preserveAspectRatio: "none",
          ...attrs,
          class: cn("lm-sparkline", attrClass(attrs))
        },
        [
          props.showArea ? h("path", { class: "lm-sparkline-area", d: areaPath }) : null,
          h("path", { class: "lm-sparkline-line", d: linePath })
        ]
      );
    };
  }
});

// -- Inbox ---------------------------------------------------------
export const LumoraInbox = defineComponent({
  name: "LumoraInbox",
  setup(_props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          role: "log",
          "aria-live": "polite",
          ...attrs,
          class: cn("lm-inbox", attrClass(attrs))
        },
        slot(slots)
      );
  }
});
export const LumoraInboxHeader = simple("LumoraInboxHeader", "div", "lm-inbox-header");
export const LumoraInboxList = simple("LumoraInboxList", "ul", "lm-inbox-list");
export const LumoraInboxItem = defineComponent({
  name: "LumoraInboxItem",
  props: { unread: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "li",
        {
          "data-state": props.unread ? "unread" : undefined,
          ...attrs,
          class: cn("lm-inbox-item", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Divider -------------------------------------------------------
export const LumoraDivider = defineComponent({
  name: "LumoraDivider",
  props: {
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal"
    }
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          role: "separator",
          "aria-orientation": props.orientation,
          ...attrs,
          class: cn(
            props.orientation === "vertical" ? "lm-divider-vertical" : "lm-divider",
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});

// -- Chat ----------------------------------------------------------
export const LumoraChat = defineComponent({
  name: "LumoraChat",
  setup(_props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          role: "log",
          "aria-live": "polite",
          ...attrs,
          class: cn("lm-chat", attrClass(attrs))
        },
        slot(slots)
      );
  }
});
export const LumoraChatMessage = defineComponent({
  name: "LumoraChatMessage",
  props: { self: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          class: cn(
            "lm-chat-message",
            props.self && "lm-chat-message-self",
            attrClass(attrs)
          )
        },
        slot(slots)
      );
  }
});
export const LumoraChatBubble = simple("LumoraChatBubble", "div", "lm-chat-bubble");

// -- Mention -------------------------------------------------------
export const LumoraMention = simple("LumoraMention", "span", "lm-mention");

// -- Rich text toolbar ---------------------------------------------
export const LumoraRichTextToolbar = simple(
  "LumoraRichTextToolbar",
  "div",
  "lm-rt-toolbar",
  "toolbar"
);
export const LumoraRichTextButton = defineComponent({
  name: "LumoraRichTextButton",
  props: { pressed: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          "aria-pressed": props.pressed,
          ...attrs,
          class: cn("lm-rt-button", attrClass(attrs))
        },
        slot(slots)
      );
  }
});

// -- Scroll area / Page-level toolbars ----------------------------
export const LumoraScrollArea = simple("LumoraScrollArea", "div", "lm-scroll-area");
export const LumoraPageHeader = simple("LumoraPageHeader", "div", "lm-page-header");
export const LumoraCommandBar = simple("LumoraCommandBar", "div", "lm-command-bar");
export const LumoraFilterBar = simple("LumoraFilterBar", "div", "lm-filter-bar");
export const LumoraBulkBar = simple("LumoraBulkBar", "div", "lm-bulk-bar");
