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
