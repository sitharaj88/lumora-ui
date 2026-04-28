export type LumoraCssInJs = {
  [key: string]: string | string[] | LumoraCssInJs | LumoraCssInJs[];
};

export type LumoraComponentStyles = Record<string, LumoraCssInJs>;

const ring = "0 0 0 3px var(--lm-color-focus-ring)";
const controlShadow = "inset 0 0 0 1px var(--lm-color-border)";
const transition =
  "background-color var(--lm-duration-base) var(--lm-ease-out), border-color var(--lm-duration-base) var(--lm-ease-out), color var(--lm-duration-base) var(--lm-ease-out), box-shadow var(--lm-duration-base) var(--lm-ease-out), transform var(--lm-duration-base) var(--lm-ease-out), opacity var(--lm-duration-base) var(--lm-ease-out)";
const disabled = {
  cursor: "not-allowed",
  opacity: "0.55",
  pointerEvents: "none"
};

export const lumoraComponents: LumoraComponentStyles = {
  // -- Button -----------------------------------------------------------
  ".lm-btn": {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "var(--lm-color-surface)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-text) 0%, transparent), color-mix(in oklab, var(--lm-color-text) 4%, transparent))",
    border: "1px solid var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: "var(--lm-shadow-sm), inset 0 1px 0 rgb(255 255 255 / 0.06)",
    color: "var(--lm-color-text)",
    cursor: "pointer",
    display: "inline-flex",
    fontWeight: "600",
    gap: "calc(0.5rem * var(--lm-density))",
    justifyContent: "center",
    letterSpacing: "-0.005em",
    lineHeight: "1",
    minHeight: "calc(2.5rem * var(--lm-density))",
    padding: "0 calc(1rem * var(--lm-density))",
    textDecoration: "none",
    transition,
    userSelect: "none",
    whiteSpace: "nowrap"
  },
  ".lm-btn:hover:not(:disabled):not([aria-disabled='true'])": {
    backgroundColor: "var(--lm-color-surface-raised)",
    boxShadow: "var(--lm-shadow-md), inset 0 1px 0 rgb(255 255 255 / 0.08)",
    transform: "translateY(-1px)"
  },
  ".lm-btn:active:not(:disabled):not([aria-disabled='true'])": {
    boxShadow: "var(--lm-shadow-sm), inset 0 2px 4px rgb(0 0 0 / 0.12)",
    transform: "translateY(0)"
  },
  ".lm-btn:disabled, .lm-btn[aria-disabled='true'], .lm-btn-disabled": disabled,
  ".lm-btn:focus-visible, .lm-input:focus-visible, .lm-textarea:focus-visible, .lm-select:focus-visible, .lm-checkbox:focus-visible, .lm-radio:focus-visible, .lm-switch:focus-visible, .lm-tab:focus-visible, .lm-pagination-item:focus-visible, .lm-segmented-item:focus-visible, .lm-tag:focus-visible, .lm-accordion-trigger:focus-visible, .lm-popover-trigger:focus-visible":
    {
      boxShadow: ring,
      outline: "2px solid transparent",
      outlineOffset: "2px"
    },
  ".lm-btn-primary": {
    backgroundColor: "var(--lm-color-primary)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-primary) 92%, white), var(--lm-color-primary))",
    borderColor: "color-mix(in oklab, var(--lm-color-primary) 80%, black)",
    boxShadow:
      "var(--lm-shadow-sm), inset 0 1px 0 rgb(255 255 255 / 0.18), 0 1px 0 rgb(0 0 0 / 0.04)",
    color: "var(--lm-color-primary-fg)"
  },
  ".lm-btn-primary:hover:not(:disabled):not([aria-disabled='true'])": {
    boxShadow: "var(--lm-shadow-glow), inset 0 1px 0 rgb(255 255 255 / 0.22)"
  },
  ".lm-btn-secondary": {
    backgroundColor: "var(--lm-color-secondary)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-secondary) 92%, white), var(--lm-color-secondary))",
    borderColor: "color-mix(in oklab, var(--lm-color-secondary) 80%, black)",
    color: "var(--lm-color-secondary-fg)"
  },
  ".lm-btn-accent": {
    backgroundColor: "var(--lm-color-accent)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-accent) 92%, white), var(--lm-color-accent))",
    borderColor: "color-mix(in oklab, var(--lm-color-accent) 80%, black)",
    color: "var(--lm-color-accent-fg)"
  },
  ".lm-btn-success": {
    backgroundColor: "var(--lm-color-success)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-success) 92%, white), var(--lm-color-success))",
    borderColor: "color-mix(in oklab, var(--lm-color-success) 80%, black)",
    color: "var(--lm-color-success-fg)"
  },
  ".lm-btn-warning": {
    backgroundColor: "var(--lm-color-warning)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-warning) 92%, white), var(--lm-color-warning))",
    borderColor: "color-mix(in oklab, var(--lm-color-warning) 80%, black)",
    color: "var(--lm-color-warning-fg)"
  },
  ".lm-btn-info": {
    backgroundColor: "var(--lm-color-info)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-info) 92%, white), var(--lm-color-info))",
    borderColor: "color-mix(in oklab, var(--lm-color-info) 80%, black)",
    color: "var(--lm-color-info-fg)"
  },
  ".lm-btn-danger": {
    backgroundColor: "var(--lm-color-danger)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-danger) 92%, white), var(--lm-color-danger))",
    borderColor: "color-mix(in oklab, var(--lm-color-danger) 80%, black)",
    color: "var(--lm-color-danger-fg)"
  },
  ".lm-btn-ghost": {
    backgroundColor: "transparent",
    backgroundImage: "none",
    borderColor: "transparent",
    boxShadow: "none",
    color: "var(--lm-color-text)"
  },
  ".lm-btn-ghost:hover:not(:disabled):not([aria-disabled='true'])": {
    backgroundColor: "var(--lm-color-surface-raised)",
    boxShadow: "none"
  },
  ".lm-btn-outline": {
    backgroundColor: "transparent",
    backgroundImage: "none",
    borderColor: "var(--lm-color-primary)",
    boxShadow: "none",
    color: "var(--lm-color-primary)"
  },
  ".lm-btn-outline:hover:not(:disabled):not([aria-disabled='true'])": {
    backgroundColor: "var(--lm-color-primary-soft)",
    boxShadow: "none"
  },
  ".lm-btn-link": {
    backgroundColor: "transparent",
    backgroundImage: "none",
    border: "0",
    borderRadius: "0",
    boxShadow: "none",
    color: "var(--lm-color-primary)",
    minHeight: "auto",
    padding: "0",
    textDecoration: "underline",
    textUnderlineOffset: "3px"
  },
  ".lm-btn-active, .lm-btn[aria-pressed='true']": {
    boxShadow: "inset 0 2px 4px rgb(0 0 0 / 0.16)",
    transform: "translateY(0)"
  },
  ".lm-btn[aria-expanded='true']": {
    boxShadow: ring
  },
  ".lm-btn-xs": { fontSize: "0.75rem", minHeight: "1.75rem", padding: "0 0.625rem" },
  ".lm-btn-sm": { fontSize: "0.8125rem", minHeight: "2rem", padding: "0 0.75rem" },
  ".lm-btn-md": { fontSize: "0.875rem", minHeight: "2.5rem", padding: "0 1rem" },
  ".lm-btn-lg": { fontSize: "0.9375rem", minHeight: "2.875rem", padding: "0 1.25rem" },
  ".lm-btn-xl": { fontSize: "1rem", minHeight: "3.25rem", padding: "0 1.5rem" },
  ".lm-btn-icon": {
    padding: "0",
    width: "calc(2.5rem * var(--lm-density))"
  },
  ".lm-btn-block": {
    width: "100%"
  },
  ".lm-btn-loading, .lm-btn[aria-busy='true']": {
    color: "transparent",
    pointerEvents: "none",
    position: "relative"
  },
  ".lm-btn-loading::after, .lm-btn[aria-busy='true']::after": {
    animation: "lm-spin 800ms linear infinite",
    border: "2px solid currentColor",
    borderRightColor: "transparent",
    borderRadius: "999px",
    color: "var(--lm-color-primary-fg)",
    content: "''",
    height: "1rem",
    position: "absolute",
    width: "1rem"
  },
  ".lm-btn-group": {
    display: "inline-flex",
    isolation: "isolate"
  },
  ".lm-btn-group > .lm-btn": {
    borderRadius: "0",
    marginLeft: "-1px"
  },
  ".lm-btn-group > .lm-btn:first-child": {
    borderTopLeftRadius: "var(--lm-radius-md)",
    borderBottomLeftRadius: "var(--lm-radius-md)",
    marginLeft: "0"
  },
  ".lm-btn-group > .lm-btn:last-child": {
    borderTopRightRadius: "var(--lm-radius-md)",
    borderBottomRightRadius: "var(--lm-radius-md)"
  },
  ".lm-btn-group > .lm-btn:hover, .lm-btn-group > .lm-btn:focus-visible": {
    zIndex: "1"
  },

  // -- Badge ------------------------------------------------------------
  ".lm-badge": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface-raised)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "999px",
    color: "var(--lm-color-text)",
    display: "inline-flex",
    fontSize: "0.75rem",
    fontWeight: "650",
    gap: "0.25rem",
    lineHeight: "1",
    minHeight: "1.5rem",
    padding: "0 0.625rem"
  },
  ".lm-badge-soft": {
    backgroundColor: "var(--lm-color-primary-soft)",
    borderColor: "transparent",
    color: "var(--lm-color-primary)"
  },
  ".lm-badge-outline": {
    backgroundColor: "transparent",
    borderColor: "var(--lm-color-border-strong)"
  },
  ".lm-badge-dot": {
    paddingLeft: "0.5rem",
    position: "relative"
  },
  ".lm-badge-dot::before": {
    backgroundColor: "currentColor",
    borderRadius: "999px",
    content: "''",
    display: "inline-block",
    height: "0.375rem",
    marginRight: "0.375rem",
    width: "0.375rem"
  },
  ".lm-badge-primary": {
    backgroundColor: "var(--lm-color-primary)",
    borderColor: "var(--lm-color-primary)",
    color: "var(--lm-color-primary-fg)"
  },
  ".lm-badge-secondary": {
    backgroundColor: "var(--lm-color-secondary)",
    borderColor: "var(--lm-color-secondary)",
    color: "var(--lm-color-secondary-fg)"
  },
  ".lm-badge-accent": {
    backgroundColor: "var(--lm-color-accent)",
    borderColor: "var(--lm-color-accent)",
    color: "var(--lm-color-accent-fg)"
  },
  ".lm-badge-info": {
    backgroundColor: "var(--lm-color-info)",
    borderColor: "var(--lm-color-info)",
    color: "var(--lm-color-info-fg)"
  },
  ".lm-badge-success": {
    backgroundColor: "var(--lm-color-success)",
    borderColor: "var(--lm-color-success)",
    color: "var(--lm-color-success-fg)"
  },
  ".lm-badge-sm": { fontSize: "0.6875rem", minHeight: "1.25rem", padding: "0 0.5rem" },
  ".lm-badge-md": { fontSize: "0.75rem", minHeight: "1.5rem", padding: "0 0.625rem" },
  ".lm-badge-lg": { fontSize: "0.875rem", minHeight: "1.75rem", padding: "0 0.75rem" },
  ".lm-badge-warning": {
    backgroundColor: "var(--lm-color-warning)",
    borderColor: "var(--lm-color-warning)",
    color: "var(--lm-color-warning-fg)"
  },
  ".lm-badge-danger": {
    backgroundColor: "var(--lm-color-danger)",
    borderColor: "var(--lm-color-danger)",
    color: "var(--lm-color-danger-fg)"
  },

  // -- Tag / Chip -------------------------------------------------------
  ".lm-tag": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface-raised)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-md)",
    color: "var(--lm-color-text)",
    cursor: "default",
    display: "inline-flex",
    fontSize: "0.8125rem",
    fontWeight: "550",
    gap: "0.375rem",
    lineHeight: "1",
    minHeight: "1.75rem",
    padding: "0 0.5rem 0 0.625rem",
    transition
  },
  ".lm-tag-removable": {
    paddingRight: "0.25rem"
  },
  ".lm-tag-remove": {
    alignItems: "center",
    backgroundColor: "transparent",
    border: "0",
    borderRadius: "999px",
    color: "var(--lm-color-muted)",
    cursor: "pointer",
    display: "inline-flex",
    height: "1.25rem",
    justifyContent: "center",
    padding: "0",
    transition,
    width: "1.25rem"
  },
  ".lm-tag-remove:hover": {
    backgroundColor: "var(--lm-color-surface-sunken)",
    color: "var(--lm-color-danger)"
  },
  ".lm-tag-input": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: controlShadow,
    display: "flex",
    flexWrap: "wrap",
    gap: "0.375rem",
    minHeight: "calc(2.5rem * var(--lm-density))",
    padding: "0.25rem 0.5rem"
  },
  ".lm-tag-input input": {
    background: "transparent",
    border: "0",
    color: "inherit",
    flex: "1",
    fontSize: "0.875rem",
    minWidth: "6rem",
    outline: "none",
    padding: "0.25rem"
  },

  // -- Alert ------------------------------------------------------------
  ".lm-alert": {
    alignItems: "flex-start",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-sm)",
    color: "var(--lm-color-text)",
    display: "grid",
    gap: "0.75rem",
    gridTemplateColumns: "auto 1fr",
    padding: "1rem 1.125rem",
    position: "relative"
  },
  ".lm-alert::before": {
    backgroundColor: "var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-lg) 0 0 var(--lm-radius-lg)",
    content: "''",
    inset: "0 auto 0 0",
    position: "absolute",
    width: "3px"
  },
  ".lm-alert-info": {
    backgroundColor: "color-mix(in oklab, var(--lm-color-info) 8%, var(--lm-color-surface))",
    borderColor: "color-mix(in oklab, var(--lm-color-info) 30%, var(--lm-color-border))"
  },
  ".lm-alert-info::before": { backgroundColor: "var(--lm-color-info)" },
  ".lm-alert-success": {
    backgroundColor: "color-mix(in oklab, var(--lm-color-success) 8%, var(--lm-color-surface))",
    borderColor: "color-mix(in oklab, var(--lm-color-success) 30%, var(--lm-color-border))"
  },
  ".lm-alert-success::before": { backgroundColor: "var(--lm-color-success)" },
  ".lm-alert-warning": {
    backgroundColor: "color-mix(in oklab, var(--lm-color-warning) 10%, var(--lm-color-surface))",
    borderColor: "color-mix(in oklab, var(--lm-color-warning) 32%, var(--lm-color-border))"
  },
  ".lm-alert-warning::before": { backgroundColor: "var(--lm-color-warning)" },
  ".lm-alert-danger": {
    backgroundColor: "color-mix(in oklab, var(--lm-color-danger) 8%, var(--lm-color-surface))",
    borderColor: "color-mix(in oklab, var(--lm-color-danger) 30%, var(--lm-color-border))"
  },
  ".lm-alert-danger::before": { backgroundColor: "var(--lm-color-danger)" },
  ".lm-alert-title": {
    fontSize: "0.9375rem",
    fontWeight: "700",
    lineHeight: "1.3",
    margin: "0 0 0.125rem"
  },

  // -- Card -------------------------------------------------------------
  ".lm-card": {
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-sm)",
    color: "var(--lm-color-text)",
    overflow: "hidden",
    transition
  },
  ".lm-card-raised": { boxShadow: "var(--lm-shadow-md)" },
  ".lm-card-flat": { boxShadow: "none" },
  ".lm-card-glass": {
    backdropFilter: "saturate(180%) blur(20px)",
    backgroundColor: "color-mix(in oklab, var(--lm-color-surface) 70%, transparent)",
    borderColor: "color-mix(in oklab, var(--lm-color-border-strong) 60%, transparent)"
  },
  ".lm-card-gradient": {
    backgroundImage:
      "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 8%, var(--lm-color-surface)), var(--lm-color-surface) 60%)"
  },
  ".lm-card-interactive": { cursor: "pointer" },
  ".lm-card-interactive:hover": {
    borderColor: "color-mix(in oklab, var(--lm-color-primary) 40%, var(--lm-color-border))",
    boxShadow: "var(--lm-shadow-md)",
    transform: "translateY(-2px)"
  },
  ".lm-card-header, .lm-card-body, .lm-card-footer": { padding: "1rem 1.25rem" },
  ".lm-card-header": { borderBottom: "1px solid var(--lm-color-border)" },
  ".lm-card-footer": {
    backgroundColor: "var(--lm-color-surface-raised)",
    borderTop: "1px solid var(--lm-color-border)"
  },
  ".lm-card-title": { fontSize: "1rem", fontWeight: "700", lineHeight: "1.3", margin: "0" },
  ".lm-card-subtitle": {
    color: "var(--lm-color-muted)",
    fontSize: "0.875rem",
    lineHeight: "1.45",
    margin: "0.25rem 0 0"
  },

  // -- Form fields ------------------------------------------------------
  ".lm-field": { display: "grid", gap: "calc(0.375rem * var(--lm-density))" },
  ".lm-label": { color: "var(--lm-color-text)", fontSize: "0.875rem", fontWeight: "650" },
  ".lm-hint": { color: "var(--lm-color-muted)", fontSize: "0.8125rem", lineHeight: "1.4" },
  ".lm-required::after": {
    color: "var(--lm-color-danger)",
    content: "'*'",
    marginLeft: "0.25rem"
  },
  ".lm-input, .lm-textarea, .lm-select": {
    appearance: "none",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: controlShadow,
    color: "var(--lm-color-text)",
    fontSize: "0.875rem",
    minHeight: "calc(2.5rem * var(--lm-density))",
    padding: "0 calc(0.75rem * var(--lm-density))",
    transition,
    width: "100%"
  },
  ".lm-input:hover:not(:disabled), .lm-textarea:hover:not(:disabled), .lm-select:hover:not(:disabled)":
    {
      borderColor: "color-mix(in oklab, var(--lm-color-primary) 50%, var(--lm-color-border-strong))"
    },
  ".lm-input:focus-visible, .lm-textarea:focus-visible, .lm-select:focus-visible": {
    borderColor: "var(--lm-color-primary)"
  },
  ".lm-input:disabled, .lm-textarea:disabled, .lm-select:disabled, .lm-input-disabled": disabled,
  ".lm-input-sm, .lm-select-sm": {
    fontSize: "0.8125rem",
    minHeight: "calc(2rem * var(--lm-density))",
    paddingLeft: "calc(0.625rem * var(--lm-density))",
    paddingRight: "calc(0.625rem * var(--lm-density))"
  },
  ".lm-input-md, .lm-select-md": {
    fontSize: "0.875rem",
    minHeight: "calc(2.5rem * var(--lm-density))"
  },
  ".lm-input-lg, .lm-select-lg": {
    fontSize: "0.9375rem",
    minHeight: "calc(3rem * var(--lm-density))",
    paddingLeft: "calc(1rem * var(--lm-density))",
    paddingRight: "calc(1rem * var(--lm-density))"
  },
  ".lm-input-group": {
    alignItems: "stretch",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: controlShadow,
    display: "flex",
    overflow: "hidden",
    transition
  },
  ".lm-input-group:focus-within": {
    borderColor: "var(--lm-color-primary)",
    boxShadow: ring
  },
  ".lm-input-group .lm-input, .lm-input-group .lm-select, .lm-input-group .lm-textarea": {
    border: "0",
    borderRadius: "0",
    boxShadow: "none"
  },
  ".lm-input-group .lm-input:focus-visible, .lm-input-group .lm-select:focus-visible": {
    boxShadow: "none"
  },
  ".lm-input-addon": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface-raised)",
    color: "var(--lm-color-muted)",
    display: "inline-flex",
    fontSize: "0.875rem",
    fontWeight: "550",
    padding: "0 0.75rem"
  },
  ".lm-input-addon:first-child": {
    borderRight: "1px solid var(--lm-color-border)"
  },
  ".lm-input-addon:last-child": {
    borderLeft: "1px solid var(--lm-color-border)"
  },
  ".lm-textarea": {
    lineHeight: "1.5",
    minHeight: "6rem",
    padding: "0.625rem 0.75rem",
    resize: "vertical"
  },
  ".lm-select": {
    backgroundImage:
      "linear-gradient(45deg, transparent 50%, var(--lm-color-muted) 50%), linear-gradient(135deg, var(--lm-color-muted) 50%, transparent 50%)",
    backgroundPosition: "calc(100% - 16px) 50%, calc(100% - 11px) 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "5px 5px, 5px 5px",
    paddingRight: "2.25rem"
  },
  ".lm-input::placeholder, .lm-textarea::placeholder": { color: "var(--lm-color-muted)" },
  ".lm-input[aria-invalid='true'], .lm-textarea[aria-invalid='true'], .lm-select[aria-invalid='true']":
    {
      borderColor: "var(--lm-color-danger)",
      boxShadow: "0 0 0 1px var(--lm-color-danger)"
    },
  ".lm-input-success, .lm-textarea-success, .lm-select-success": {
    borderColor: "var(--lm-color-success)",
    boxShadow: "0 0 0 1px var(--lm-color-success)"
  },
  ".lm-input-warning, .lm-textarea-warning, .lm-select-warning": {
    borderColor: "var(--lm-color-warning)",
    boxShadow: "0 0 0 1px var(--lm-color-warning)"
  },
  ".lm-input-danger, .lm-textarea-danger, .lm-select-danger, .lm-input-invalid": {
    borderColor: "var(--lm-color-danger)",
    boxShadow: "0 0 0 1px var(--lm-color-danger)"
  },

  // -- Checkbox / Radio / Switch ----------------------------------------
  ".lm-checkbox, .lm-radio": {
    accentColor: "var(--lm-color-primary)",
    height: "1rem",
    width: "1rem"
  },
  ".lm-checkbox:disabled, .lm-radio:disabled, .lm-switch:disabled": disabled,
  ".lm-checkbox-sm, .lm-radio-sm": { height: "0.875rem", width: "0.875rem" },
  ".lm-checkbox-md, .lm-radio-md": { height: "1rem", width: "1rem" },
  ".lm-checkbox-lg, .lm-radio-lg": { height: "1.25rem", width: "1.25rem" },
  ".lm-switch": {
    appearance: "none",
    backgroundColor: "var(--lm-color-border-strong)",
    borderRadius: "999px",
    cursor: "pointer",
    height: "1.5rem",
    position: "relative",
    transition,
    width: "2.75rem"
  },
  ".lm-switch::after": {
    backgroundColor: "var(--lm-color-surface)",
    borderRadius: "999px",
    boxShadow: "var(--lm-shadow-sm), 0 1px 2px rgb(0 0 0 / 0.18)",
    content: "''",
    height: "1.125rem",
    left: "0.1875rem",
    position: "absolute",
    top: "0.1875rem",
    transition,
    width: "1.125rem"
  },
  ".lm-switch:checked": {
    backgroundColor: "var(--lm-color-primary)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-primary) 92%, white), var(--lm-color-primary))"
  },
  ".lm-switch:checked::after": { transform: "translateX(1.25rem)" },
  ".lm-switch-sm": { height: "1.25rem", width: "2.25rem" },
  ".lm-switch-sm::after": { height: "0.875rem", width: "0.875rem" },
  ".lm-switch-sm:checked::after": { transform: "translateX(1rem)" },
  ".lm-switch-lg": { height: "1.75rem", width: "3.25rem" },
  ".lm-switch-lg::after": { height: "1.375rem", width: "1.375rem" },
  ".lm-switch-lg:checked::after": { transform: "translateX(1.5rem)" },

  // -- Slider / Range ---------------------------------------------------
  ".lm-slider": {
    appearance: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    height: "1.5rem",
    width: "100%"
  },
  ".lm-slider::-webkit-slider-runnable-track": {
    backgroundColor: "var(--lm-color-surface-raised)",
    borderRadius: "999px",
    height: "0.375rem"
  },
  ".lm-slider::-moz-range-track": {
    backgroundColor: "var(--lm-color-surface-raised)",
    borderRadius: "999px",
    height: "0.375rem"
  },
  ".lm-slider::-webkit-slider-thumb": {
    appearance: "none",
    backgroundColor: "var(--lm-color-surface)",
    border: "2px solid var(--lm-color-primary)",
    borderRadius: "999px",
    boxShadow: "var(--lm-shadow-sm)",
    height: "1.125rem",
    marginTop: "-0.375rem",
    transition,
    width: "1.125rem"
  },
  ".lm-slider::-moz-range-thumb": {
    backgroundColor: "var(--lm-color-surface)",
    border: "2px solid var(--lm-color-primary)",
    borderRadius: "999px",
    boxShadow: "var(--lm-shadow-sm)",
    height: "1.125rem",
    transition,
    width: "1.125rem"
  },
  ".lm-slider:hover::-webkit-slider-thumb": {
    boxShadow: "var(--lm-shadow-glow)",
    transform: "scale(1.08)"
  },
  ".lm-slider:focus-visible::-webkit-slider-thumb": {
    boxShadow: ring
  },

  // -- Rating -----------------------------------------------------------
  ".lm-rating": {
    alignItems: "center",
    color: "var(--lm-color-warning)",
    display: "inline-flex",
    gap: "0.125rem"
  },
  ".lm-rating-star": {
    background: "transparent",
    border: "0",
    color: "var(--lm-color-border-strong)",
    cursor: "pointer",
    fontSize: "1.125rem",
    lineHeight: "1",
    padding: "0.125rem",
    transition
  },
  ".lm-rating-star[aria-checked='true'], .lm-rating-star-active": {
    color: "var(--lm-color-warning)"
  },
  ".lm-rating-star:hover": {
    color: "var(--lm-color-warning)",
    transform: "scale(1.12)"
  },

  // -- Tabs -------------------------------------------------------------
  ".lm-tabs": {
    alignItems: "center",
    borderBottom: "1px solid var(--lm-color-border)",
    display: "flex",
    gap: "0.25rem"
  },
  ".lm-tabs-pills": {
    backgroundColor: "var(--lm-color-surface-raised)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-md)",
    gap: "0",
    padding: "0.25rem"
  },
  ".lm-tabs-pills .lm-tab": {
    borderBottom: "0",
    borderRadius: "var(--lm-radius-sm)"
  },
  ".lm-tabs-pills .lm-tab[aria-selected='true']": {
    backgroundColor: "var(--lm-color-surface)",
    borderBottomColor: "transparent",
    boxShadow: "var(--lm-shadow-sm)",
    color: "var(--lm-color-text)"
  },
  ".lm-tab": {
    backgroundColor: "transparent",
    border: "0",
    borderBottom: "2px solid transparent",
    color: "var(--lm-color-muted)",
    cursor: "pointer",
    fontWeight: "650",
    padding: "0.75rem 0.875rem",
    position: "relative",
    transition
  },
  ".lm-tab:hover:not(:disabled):not([aria-disabled='true'])": {
    color: "var(--lm-color-text)"
  },
  ".lm-tab[aria-selected='true'], .lm-tab-active": {
    borderBottomColor: "var(--lm-color-primary)",
    color: "var(--lm-color-primary)"
  },
  ".lm-tab:disabled, .lm-tab[aria-disabled='true']": disabled,
  ".lm-tab-sm": { fontSize: "0.8125rem", padding: "0.5rem 0.625rem" },
  ".lm-tab-md": { fontSize: "0.875rem", padding: "0.75rem 0.875rem" },
  ".lm-tab-lg": { fontSize: "1rem", padding: "1rem 1rem" },

  // -- Segmented control -----------------------------------------------
  ".lm-segmented": {
    backgroundColor: "var(--lm-color-surface-sunken)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-md)",
    display: "inline-flex",
    gap: "0",
    padding: "0.25rem"
  },
  ".lm-segmented-item": {
    backgroundColor: "transparent",
    border: "0",
    borderRadius: "calc(var(--lm-radius-md) - 0.25rem)",
    color: "var(--lm-color-muted)",
    cursor: "pointer",
    fontSize: "0.8125rem",
    fontWeight: "600",
    padding: "0.4375rem 0.75rem",
    transition
  },
  ".lm-segmented-item:hover": { color: "var(--lm-color-text)" },
  ".lm-segmented-item[aria-pressed='true'], .lm-segmented-item-active": {
    backgroundColor: "var(--lm-color-surface)",
    boxShadow: "var(--lm-shadow-sm)",
    color: "var(--lm-color-text)"
  },

  // -- Dropdown / Menu --------------------------------------------------
  ".lm-dropdown": { display: "inline-block", position: "relative" },
  ".lm-dropdown-menu": {
    animation: "lm-pop var(--lm-duration-base) var(--lm-ease-out)",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-lg)",
    color: "var(--lm-color-text)",
    display: "grid",
    gap: "0.125rem",
    minWidth: "13rem",
    padding: "0.375rem",
    position: "absolute",
    right: "0",
    top: "calc(100% + 0.5rem)",
    transformOrigin: "top right",
    zIndex: "40"
  },
  ".lm-dropdown-menu[hidden], .lm-dropdown-menu[data-state='closed']": { display: "none" },
  ".lm-dropdown-menu[data-side='left']": { left: "0", right: "auto" },
  ".lm-dropdown-menu[data-side='right']": { left: "auto", right: "0" },
  ".lm-dropdown-menu[data-side='top']": { bottom: "calc(100% + 0.5rem)", top: "auto" },
  ".lm-dropdown-label": {
    color: "var(--lm-color-muted)",
    fontSize: "0.6875rem",
    fontWeight: "700",
    letterSpacing: "0.08em",
    padding: "0.5rem 0.625rem 0.25rem",
    textTransform: "uppercase"
  },
  ".lm-dropdown-separator": {
    backgroundColor: "var(--lm-color-border)",
    height: "1px",
    margin: "0.25rem 0"
  },
  ".lm-dropdown-item": {
    alignItems: "center",
    borderRadius: "var(--lm-radius-sm)",
    color: "var(--lm-color-text)",
    display: "flex",
    fontSize: "0.875rem",
    gap: "0.625rem",
    padding: "0.5rem 0.625rem",
    textDecoration: "none",
    transition
  },
  ".lm-dropdown-item:hover": { backgroundColor: "var(--lm-color-surface-raised)" },
  ".lm-dropdown-item[aria-selected='true'], .lm-dropdown-item-active": {
    backgroundColor: "var(--lm-color-primary-soft)",
    color: "var(--lm-color-primary)"
  },
  ".lm-dropdown-item[aria-disabled='true'], .lm-dropdown-item-disabled": disabled,
  ".lm-dropdown-shortcut": {
    color: "var(--lm-color-muted)",
    fontSize: "0.75rem",
    marginLeft: "auto"
  },

  // -- Modal ------------------------------------------------------------
  ".lm-modal": {
    alignItems: "center",
    animation: "lm-fade var(--lm-duration-base) var(--lm-ease-out)",
    backdropFilter: "blur(8px) saturate(160%)",
    backgroundColor: "var(--lm-color-overlay)",
    display: "grid",
    inset: "0",
    justifyItems: "center",
    padding: "1rem",
    position: "fixed",
    zIndex: "50"
  },
  ".lm-modal-panel": {
    animation: "lm-scale-in var(--lm-duration-slow) var(--lm-ease-spring)",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-xl)",
    boxShadow: "var(--lm-shadow-xl)",
    color: "var(--lm-color-text)",
    maxWidth: "36rem",
    width: "min(100%, 36rem)"
  },
  ".lm-modal[hidden], .lm-modal[data-state='closed']": { display: "none" },
  ".lm-modal-sm .lm-modal-panel, .lm-modal-panel-sm": {
    maxWidth: "28rem",
    width: "min(100%, 28rem)"
  },
  ".lm-modal-md .lm-modal-panel, .lm-modal-panel-md": {
    maxWidth: "36rem",
    width: "min(100%, 36rem)"
  },
  ".lm-modal-lg .lm-modal-panel, .lm-modal-panel-lg": {
    maxWidth: "48rem",
    width: "min(100%, 48rem)"
  },
  ".lm-modal-xl .lm-modal-panel, .lm-modal-panel-xl": {
    maxWidth: "64rem",
    width: "min(100%, 64rem)"
  },
  ".lm-modal-header, .lm-modal-body, .lm-modal-footer": { padding: "1.125rem 1.25rem" },
  ".lm-modal-header": {
    borderBottom: "1px solid var(--lm-color-border)"
  },
  ".lm-modal-title": {
    fontSize: "1.125rem",
    fontWeight: "700",
    letterSpacing: "-0.01em",
    margin: "0"
  },
  ".lm-modal-footer": {
    borderTop: "1px solid var(--lm-color-border)",
    display: "flex",
    gap: "0.5rem",
    justifyContent: "flex-end"
  },

  // -- Drawer -----------------------------------------------------------
  ".lm-drawer": {
    animation: "lm-slide-in-right var(--lm-duration-slow) var(--lm-ease-out)",
    backgroundColor: "var(--lm-color-surface)",
    borderLeft: "1px solid var(--lm-color-border)",
    boxShadow: "var(--lm-shadow-xl)",
    color: "var(--lm-color-text)",
    height: "100dvh",
    maxWidth: "28rem",
    padding: "1.25rem",
    position: "fixed",
    right: "0",
    top: "0",
    width: "min(100%, 28rem)",
    zIndex: "50"
  },
  ".lm-drawer[hidden], .lm-drawer[data-state='closed']": { display: "none" },
  ".lm-drawer-left": {
    animation: "lm-slide-in-left var(--lm-duration-slow) var(--lm-ease-out)",
    borderLeft: "0",
    borderRight: "1px solid var(--lm-color-border)",
    left: "0",
    right: "auto"
  },
  ".lm-drawer-sm": { maxWidth: "20rem", width: "min(100%, 20rem)" },
  ".lm-drawer-md": { maxWidth: "28rem", width: "min(100%, 28rem)" },
  ".lm-drawer-lg": { maxWidth: "36rem", width: "min(100%, 36rem)" },

  // -- Tooltip ----------------------------------------------------------
  ".lm-tooltip": { display: "inline-flex", position: "relative" },
  ".lm-tooltip-content": {
    animation: "lm-fade var(--lm-duration-fast) var(--lm-ease-out)",
    backgroundColor: "var(--lm-color-text)",
    borderRadius: "var(--lm-radius-sm)",
    bottom: "calc(100% + 0.5rem)",
    boxShadow: "var(--lm-shadow-md)",
    color: "var(--lm-color-bg)",
    fontSize: "0.75rem",
    fontWeight: "600",
    left: "50%",
    maxWidth: "16rem",
    padding: "0.4375rem 0.625rem",
    position: "absolute",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    zIndex: "50"
  },
  ".lm-tooltip-content::after": {
    backgroundColor: "var(--lm-color-text)",
    content: "''",
    height: "0.5rem",
    left: "50%",
    position: "absolute",
    top: "100%",
    transform: "translate(-50%, -50%) rotate(45deg)",
    width: "0.5rem"
  },
  ".lm-tooltip-content[hidden]": { display: "none" },
  ".lm-tooltip-content[data-side='bottom']": { bottom: "auto", top: "calc(100% + 0.5rem)" },
  ".lm-tooltip-content[data-side='bottom']::after": { bottom: "100%", top: "0" },
  ".lm-tooltip-content[data-side='left']": {
    bottom: "auto",
    left: "auto",
    right: "calc(100% + 0.5rem)",
    top: "50%",
    transform: "translateY(-50%)"
  },
  ".lm-tooltip-content[data-side='left']::after": {
    left: "100%",
    top: "50%",
    transform: "translate(-50%, -50%) rotate(45deg)"
  },
  ".lm-tooltip-content[data-side='right']": {
    bottom: "auto",
    left: "calc(100% + 0.5rem)",
    top: "50%",
    transform: "translateY(-50%)"
  },
  ".lm-tooltip-content[data-side='right']::after": {
    left: "0",
    top: "50%",
    transform: "translate(-50%, -50%) rotate(45deg)"
  },

  // -- Popover ----------------------------------------------------------
  ".lm-popover": { display: "inline-block", position: "relative" },
  ".lm-popover-content": {
    animation: "lm-pop var(--lm-duration-base) var(--lm-ease-spring)",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-lg)",
    color: "var(--lm-color-text)",
    fontSize: "0.875rem",
    maxWidth: "20rem",
    padding: "0.875rem 1rem",
    position: "absolute",
    top: "calc(100% + 0.5rem)",
    transformOrigin: "top center",
    zIndex: "45"
  },
  ".lm-popover-content[hidden], .lm-popover-content[data-state='closed']": { display: "none" },
  ".lm-popover-content[data-side='bottom']": { top: "calc(100% + 0.5rem)" },
  ".lm-popover-content[data-side='top']": { bottom: "calc(100% + 0.5rem)", top: "auto" },
  ".lm-popover-arrow": {
    backgroundColor: "var(--lm-color-surface)",
    borderLeft: "1px solid var(--lm-color-border)",
    borderTop: "1px solid var(--lm-color-border)",
    height: "0.5rem",
    left: "1rem",
    position: "absolute",
    top: "-0.25rem",
    transform: "rotate(45deg)",
    width: "0.5rem"
  },

  // -- Toast ------------------------------------------------------------
  ".lm-toast": {
    animation: "lm-slide-in-right var(--lm-duration-slow) var(--lm-ease-spring)",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderLeft: "3px solid var(--lm-color-primary)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-xl)",
    color: "var(--lm-color-text)",
    display: "flex",
    gap: "0.75rem",
    maxWidth: "24rem",
    padding: "1rem 1.125rem"
  },
  ".lm-toast-info": { borderLeftColor: "var(--lm-color-info)" },
  ".lm-toast-success": { borderLeftColor: "var(--lm-color-success)" },
  ".lm-toast-warning": { borderLeftColor: "var(--lm-color-warning)" },
  ".lm-toast-danger": { borderLeftColor: "var(--lm-color-danger)" },
  ".lm-toast-sm": { fontSize: "0.875rem", padding: "0.75rem 0.875rem" },
  ".lm-toast-md": { fontSize: "0.9375rem", padding: "1rem 1.125rem" },
  ".lm-toast-lg": { fontSize: "1rem", padding: "1.125rem 1.25rem" },
  ".lm-toast-title": { fontSize: "0.9375rem", fontWeight: "700", margin: "0 0 0.125rem" },
  ".lm-toaster": {
    bottom: "1.25rem",
    display: "grid",
    gap: "0.625rem",
    pointerEvents: "none",
    position: "fixed",
    right: "1.25rem",
    zIndex: "60"
  },
  ".lm-toaster > *": { pointerEvents: "auto" },

  // -- Avatar -----------------------------------------------------------
  ".lm-avatar": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-primary)",
    backgroundImage:
      "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 88%, white), var(--lm-color-primary))",
    borderRadius: "999px",
    color: "var(--lm-color-primary-fg)",
    display: "inline-flex",
    fontWeight: "700",
    height: "2.5rem",
    justifyContent: "center",
    overflow: "hidden",
    width: "2.5rem"
  },
  ".lm-avatar-xs": { fontSize: "0.6875rem", height: "1.5rem", width: "1.5rem" },
  ".lm-avatar-sm": { height: "2rem", width: "2rem" },
  ".lm-avatar-md": { height: "2.5rem", width: "2.5rem" },
  ".lm-avatar-lg": { height: "3.5rem", width: "3.5rem" },
  ".lm-avatar-xl": { fontSize: "1.25rem", height: "4.5rem", width: "4.5rem" },
  ".lm-avatar img": { height: "100%", objectFit: "cover", width: "100%" },
  ".lm-avatar-group": {
    alignItems: "center",
    display: "inline-flex"
  },
  ".lm-avatar-group .lm-avatar": {
    border: "2px solid var(--lm-color-surface)",
    boxShadow: "var(--lm-shadow-sm)",
    marginLeft: "-0.5rem"
  },
  ".lm-avatar-group .lm-avatar:first-child": { marginLeft: "0" },
  ".lm-avatar-status": {
    backgroundColor: "var(--lm-color-success)",
    border: "2px solid var(--lm-color-surface)",
    borderRadius: "999px",
    bottom: "0",
    height: "0.625rem",
    position: "absolute",
    right: "0",
    width: "0.625rem"
  },

  // -- Breadcrumbs ------------------------------------------------------
  ".lm-breadcrumbs": {
    alignItems: "center",
    color: "var(--lm-color-muted)",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "0.875rem",
    gap: "0.5rem"
  },
  ".lm-breadcrumbs a": { color: "var(--lm-color-muted)", textDecoration: "none", transition },
  ".lm-breadcrumbs a:hover": { color: "var(--lm-color-primary)" },
  ".lm-breadcrumbs [aria-current='page']": { color: "var(--lm-color-text)", fontWeight: "650" },

  // -- Pagination -------------------------------------------------------
  ".lm-pagination": { alignItems: "center", display: "flex", gap: "0.25rem" },
  ".lm-pagination-item": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-md)",
    color: "var(--lm-color-text)",
    display: "inline-flex",
    fontSize: "0.875rem",
    fontWeight: "600",
    height: "2.25rem",
    justifyContent: "center",
    minWidth: "2.25rem",
    padding: "0 0.625rem",
    textDecoration: "none",
    transition
  },
  ".lm-pagination-item[aria-current='page'], .lm-pagination-active": {
    backgroundColor: "var(--lm-color-primary)",
    backgroundImage:
      "linear-gradient(180deg, color-mix(in oklab, var(--lm-color-primary) 92%, white), var(--lm-color-primary))",
    borderColor: "var(--lm-color-primary)",
    color: "var(--lm-color-primary-fg)"
  },
  ".lm-pagination-item:hover:not([aria-current='page']):not([aria-disabled='true'])": {
    backgroundColor: "var(--lm-color-surface-raised)",
    borderColor: "var(--lm-color-border-strong)"
  },
  ".lm-pagination-item[aria-disabled='true'], .lm-pagination-disabled": disabled,
  ".lm-pagination-sm .lm-pagination-item, .lm-pagination-item-sm": {
    fontSize: "0.8125rem",
    height: "2rem",
    minWidth: "2rem"
  },
  ".lm-pagination-lg .lm-pagination-item, .lm-pagination-item-lg": {
    fontSize: "1rem",
    height: "2.75rem",
    minWidth: "2.75rem"
  },

  // -- Navbar / Sidebar -------------------------------------------------
  ".lm-navbar": {
    alignItems: "center",
    backgroundColor:
      "color-mix(in oklab, var(--lm-color-surface) 78%, transparent)",
    backdropFilter: "saturate(180%) blur(14px)",
    borderBottom: "1px solid var(--lm-color-border)",
    color: "var(--lm-color-text)",
    display: "flex",
    gap: "1rem",
    minHeight: "4rem",
    padding: "0 1.25rem",
    position: "sticky",
    top: "0",
    zIndex: "30"
  },
  ".lm-navbar-brand": {
    alignItems: "center",
    color: "var(--lm-color-text)",
    display: "inline-flex",
    fontSize: "0.9375rem",
    fontWeight: "700",
    gap: "0.5rem",
    letterSpacing: "-0.01em",
    textDecoration: "none"
  },
  ".lm-sidebar": {
    backgroundColor: "var(--lm-color-surface)",
    borderRight: "1px solid var(--lm-color-border)",
    color: "var(--lm-color-text)",
    display: "grid",
    gap: "0.125rem",
    padding: "1rem 0.75rem",
    width: "16rem"
  },
  ".lm-sidebar-section": {
    color: "var(--lm-color-muted)",
    fontSize: "0.6875rem",
    fontWeight: "700",
    letterSpacing: "0.08em",
    padding: "0.625rem 0.625rem 0.25rem",
    textTransform: "uppercase"
  },
  ".lm-sidebar-item": {
    alignItems: "center",
    borderRadius: "var(--lm-radius-md)",
    color: "var(--lm-color-muted)",
    display: "flex",
    fontSize: "0.875rem",
    fontWeight: "600",
    gap: "0.625rem",
    padding: "0.5625rem 0.75rem",
    textDecoration: "none",
    transition
  },
  ".lm-sidebar-item:hover, .lm-sidebar-item-active": {
    backgroundColor: "var(--lm-color-surface-raised)",
    color: "var(--lm-color-text)"
  },
  ".lm-sidebar-item[aria-current='page']": {
    backgroundColor: "var(--lm-color-primary-soft)",
    color: "var(--lm-color-primary)",
    fontWeight: "650"
  },
  ".lm-sidebar-compact": { width: "4.5rem" },

  // -- Table ------------------------------------------------------------
  ".lm-table": {
    borderCollapse: "separate",
    borderSpacing: "0",
    color: "var(--lm-color-text)",
    fontSize: "0.875rem",
    width: "100%"
  },
  ".lm-table th": {
    backgroundColor: "var(--lm-color-surface-sunken)",
    borderBottom: "1px solid var(--lm-color-border)",
    color: "var(--lm-color-muted)",
    fontSize: "0.75rem",
    fontWeight: "700",
    letterSpacing: "0.04em",
    padding: "0.6875rem 0.875rem",
    textAlign: "left",
    textTransform: "uppercase"
  },
  ".lm-table td": {
    borderBottom: "1px solid var(--lm-color-border)",
    padding: "0.875rem"
  },
  ".lm-table tbody tr": { transition },
  ".lm-table tbody tr:hover td": {
    backgroundColor: "color-mix(in oklab, var(--lm-color-primary) 4%, var(--lm-color-surface))"
  },
  ".lm-table-striped tbody tr:nth-child(even) td": {
    backgroundColor: "color-mix(in oklab, var(--lm-color-surface-raised) 50%, transparent)"
  },
  ".lm-table-compact th, .lm-table-compact td": { padding: "0.5rem" },
  ".lm-table-spacious th, .lm-table-spacious td": { padding: "1.125rem" },

  // -- Skeleton / Progress / Spinner ------------------------------------
  ".lm-skeleton": {
    animation: "lm-shimmer 1.6s linear infinite",
    backgroundColor: "var(--lm-color-surface-raised)",
    backgroundImage:
      "linear-gradient(90deg, transparent, color-mix(in oklab, var(--lm-color-text) 8%, transparent), transparent)",
    backgroundSize: "200% 100%",
    borderRadius: "var(--lm-radius-md)",
    color: "transparent",
    minHeight: "1rem"
  },
  ".lm-skeleton-circle": { borderRadius: "999px" },
  ".lm-skeleton-text": { height: "1em", minHeight: "1em" },
  ".lm-progress": {
    appearance: "none",
    backgroundColor: "var(--lm-color-surface-raised)",
    border: "0",
    borderRadius: "999px",
    height: "0.625rem",
    overflow: "hidden",
    width: "100%"
  },
  ".lm-progress-sm": { height: "0.375rem" },
  ".lm-progress-md": { height: "0.625rem" },
  ".lm-progress-lg": { height: "0.875rem" },
  ".lm-progress::-webkit-progress-bar": { backgroundColor: "var(--lm-color-surface-raised)" },
  ".lm-progress::-webkit-progress-value": {
    backgroundImage:
      "linear-gradient(90deg, color-mix(in oklab, var(--lm-color-primary) 80%, white), var(--lm-color-primary))",
    transition: "inline-size var(--lm-duration-slow) var(--lm-ease-out)"
  },
  ".lm-progress::-moz-progress-bar": {
    backgroundImage:
      "linear-gradient(90deg, color-mix(in oklab, var(--lm-color-primary) 80%, white), var(--lm-color-primary))"
  },
  ".lm-spinner": {
    animation: "lm-spin 800ms linear infinite",
    border: "2px solid color-mix(in oklab, var(--lm-color-border-strong) 80%, transparent)",
    borderRadius: "999px",
    borderTopColor: "var(--lm-color-primary)",
    display: "inline-block",
    height: "1.25rem",
    width: "1.25rem"
  },
  ".lm-spinner-sm": { height: "1rem", width: "1rem" },
  ".lm-spinner-md": { height: "1.25rem", width: "1.25rem" },
  ".lm-spinner-lg": { height: "2rem", width: "2rem" },

  // -- Accordion --------------------------------------------------------
  ".lm-accordion": {
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    overflow: "hidden"
  },
  ".lm-accordion-item + .lm-accordion-item": {
    borderTop: "1px solid var(--lm-color-border)"
  },
  ".lm-accordion-trigger": {
    alignItems: "center",
    backgroundColor: "transparent",
    border: "0",
    color: "var(--lm-color-text)",
    cursor: "pointer",
    display: "flex",
    fontSize: "0.9375rem",
    fontWeight: "650",
    gap: "0.75rem",
    justifyContent: "space-between",
    padding: "1rem 1.125rem",
    textAlign: "left",
    transition,
    width: "100%"
  },
  ".lm-accordion-trigger:hover": { backgroundColor: "var(--lm-color-surface-raised)" },
  ".lm-accordion-trigger::after": {
    content: "'›'",
    fontSize: "1.25rem",
    transform: "rotate(90deg)",
    transition: "transform var(--lm-duration-base) var(--lm-ease-out)"
  },
  ".lm-accordion-trigger[aria-expanded='true']::after": {
    transform: "rotate(-90deg)"
  },
  ".lm-accordion-content": {
    color: "var(--lm-color-muted)",
    fontSize: "0.875rem",
    lineHeight: "1.6",
    padding: "0 1.125rem 1.125rem"
  },
  ".lm-accordion-content[hidden], .lm-accordion-content[data-state='closed']": { display: "none" },

  // -- Stepper / Wizard ------------------------------------------------
  ".lm-stepper": {
    counterReset: "lm-step",
    display: "flex",
    gap: "0",
    listStyle: "none",
    margin: "0",
    padding: "0"
  },
  ".lm-step": {
    alignItems: "center",
    color: "var(--lm-color-muted)",
    counterIncrement: "lm-step",
    display: "flex",
    flex: "1",
    fontSize: "0.875rem",
    fontWeight: "600",
    gap: "0.625rem",
    minWidth: "0",
    position: "relative"
  },
  ".lm-step:not(:last-child)::after": {
    backgroundColor: "var(--lm-color-border)",
    content: "''",
    flex: "1",
    height: "1px",
    margin: "0 0.75rem"
  },
  ".lm-step-marker": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border-strong)",
    borderRadius: "999px",
    color: "var(--lm-color-muted)",
    display: "inline-flex",
    flexShrink: "0",
    fontSize: "0.8125rem",
    fontWeight: "700",
    height: "1.75rem",
    justifyContent: "center",
    transition,
    width: "1.75rem"
  },
  ".lm-step-marker::before": { content: "counter(lm-step)" },
  ".lm-step[aria-current='step'] .lm-step-marker": {
    backgroundColor: "var(--lm-color-primary)",
    borderColor: "var(--lm-color-primary)",
    boxShadow: "var(--lm-shadow-glow)",
    color: "var(--lm-color-primary-fg)"
  },
  ".lm-step[aria-current='step']": { color: "var(--lm-color-text)" },
  ".lm-step-complete .lm-step-marker, .lm-step[data-state='complete'] .lm-step-marker": {
    backgroundColor: "var(--lm-color-success)",
    borderColor: "var(--lm-color-success)",
    color: "var(--lm-color-success-fg)"
  },
  ".lm-step-complete .lm-step-marker::before, .lm-step[data-state='complete'] .lm-step-marker::before":
    {
      content: "'✓'"
    },
  ".lm-step-complete:not(:last-child)::after, .lm-step[data-state='complete']:not(:last-child)::after":
    {
      backgroundColor: "var(--lm-color-success)"
    },

  // -- Kbd / Code -------------------------------------------------------
  ".lm-kbd": {
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border-strong)",
    borderBottomWidth: "2px",
    borderRadius: "var(--lm-radius-sm)",
    boxShadow: "var(--lm-shadow-sm)",
    color: "var(--lm-color-text)",
    display: "inline-flex",
    fontFamily:
      "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
    fontSize: "0.75rem",
    fontWeight: "600",
    minWidth: "1.5rem",
    padding: "0.0625rem 0.375rem"
  },
  ".lm-code": {
    backgroundColor: "var(--lm-color-surface-sunken)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-sm)",
    color: "var(--lm-color-text)",
    fontFamily:
      "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
    fontSize: "0.8125rem",
    padding: "0.125rem 0.375rem"
  },
  ".lm-code-block": {
    backgroundColor: "var(--lm-color-surface-sunken)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    color: "var(--lm-color-text)",
    fontFamily:
      "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
    fontSize: "0.8125rem",
    lineHeight: "1.65",
    overflow: "auto",
    padding: "1rem 1.125rem"
  },

  // -- Dropzone / File upload -------------------------------------------
  ".lm-dropzone": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface-sunken)",
    border: "2px dashed var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-lg)",
    color: "var(--lm-color-muted)",
    cursor: "pointer",
    display: "grid",
    gap: "0.5rem",
    justifyItems: "center",
    minHeight: "12rem",
    padding: "1.5rem",
    textAlign: "center",
    transition
  },
  ".lm-dropzone:hover, .lm-dropzone[data-state='hover']": {
    backgroundColor: "var(--lm-color-primary-soft)",
    borderColor: "var(--lm-color-primary)",
    color: "var(--lm-color-primary)"
  },
  ".lm-dropzone[data-state='active']": {
    backgroundColor: "var(--lm-color-primary-soft)",
    borderColor: "var(--lm-color-primary)",
    boxShadow: "var(--lm-shadow-glow)",
    color: "var(--lm-color-primary)"
  },
  ".lm-dropzone-title": {
    color: "var(--lm-color-text)",
    fontSize: "0.9375rem",
    fontWeight: "650",
    margin: "0"
  },

  // -- Command palette --------------------------------------------------
  ".lm-command": {
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-xl)",
    boxShadow: "var(--lm-shadow-xl)",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    maxWidth: "40rem",
    overflow: "hidden",
    width: "100%"
  },
  ".lm-command-input": {
    backgroundColor: "transparent",
    border: "0",
    borderBottom: "1px solid var(--lm-color-border)",
    color: "var(--lm-color-text)",
    fontSize: "0.9375rem",
    outline: "none",
    padding: "0.875rem 1.125rem"
  },
  ".lm-command-list": {
    listStyle: "none",
    margin: "0",
    maxHeight: "20rem",
    overflowY: "auto",
    padding: "0.375rem"
  },
  ".lm-command-group-label": {
    color: "var(--lm-color-muted)",
    fontSize: "0.6875rem",
    fontWeight: "700",
    letterSpacing: "0.08em",
    padding: "0.625rem 0.75rem 0.25rem",
    textTransform: "uppercase"
  },
  ".lm-command-item": {
    alignItems: "center",
    borderRadius: "var(--lm-radius-sm)",
    color: "var(--lm-color-text)",
    cursor: "pointer",
    display: "flex",
    fontSize: "0.875rem",
    gap: "0.625rem",
    padding: "0.5625rem 0.75rem",
    transition
  },
  ".lm-command-item[aria-selected='true'], .lm-command-item-active": {
    backgroundColor: "var(--lm-color-primary-soft)",
    color: "var(--lm-color-primary)"
  },
  ".lm-command-empty": {
    color: "var(--lm-color-muted)",
    fontSize: "0.875rem",
    padding: "1.5rem",
    textAlign: "center"
  },
  ".lm-command-footer": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface-raised)",
    borderTop: "1px solid var(--lm-color-border)",
    color: "var(--lm-color-muted)",
    display: "flex",
    fontSize: "0.75rem",
    gap: "0.75rem",
    justifyContent: "space-between",
    padding: "0.625rem 1rem"
  },

  // -- Tree view --------------------------------------------------------
  ".lm-tree": {
    color: "var(--lm-color-text)",
    fontSize: "0.875rem",
    listStyle: "none",
    margin: "0",
    padding: "0"
  },
  ".lm-tree ul": {
    borderLeft: "1px dashed var(--lm-color-border)",
    listStyle: "none",
    margin: "0",
    paddingLeft: "1rem"
  },
  ".lm-tree-item": {
    alignItems: "center",
    borderRadius: "var(--lm-radius-sm)",
    color: "var(--lm-color-text)",
    cursor: "pointer",
    display: "flex",
    gap: "0.375rem",
    padding: "0.3125rem 0.5rem",
    transition
  },
  ".lm-tree-item:hover": { backgroundColor: "var(--lm-color-surface-raised)" },
  ".lm-tree-item[aria-selected='true']": {
    backgroundColor: "var(--lm-color-primary-soft)",
    color: "var(--lm-color-primary)"
  },

  // -- App shell + workflow primitives ----------------------------------
  ".lm-app-shell": {
    backgroundColor: "var(--lm-color-bg)",
    color: "var(--lm-color-text)",
    display: "grid",
    minHeight: "100dvh"
  },
  ".lm-app-shell-sidebar": {
    display: "grid",
    gridTemplateColumns: "16rem minmax(0, 1fr)"
  },
  ".lm-app-main": {
    display: "grid",
    gap: "1.5rem",
    minWidth: "0",
    padding: "1.5rem"
  },
  ".lm-page-header": {
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "space-between"
  },
  ".lm-page-title": {
    fontSize: "1.875rem",
    fontWeight: "750",
    letterSpacing: "-0.02em",
    lineHeight: "1.15",
    margin: "0"
  },
  ".lm-page-description": {
    color: "var(--lm-color-muted)",
    lineHeight: "1.6",
    margin: "0.375rem 0 0",
    maxWidth: "60ch"
  },
  ".lm-command-bar": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-sm)",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "space-between",
    padding: "0.75rem"
  },
  ".lm-filter-bar": {
    alignItems: "end",
    display: "grid",
    gap: "0.75rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))"
  },
  ".lm-table-toolbar": {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "space-between",
    marginBottom: "0.75rem"
  },
  ".lm-table-title": {
    fontSize: "1rem",
    fontWeight: "700",
    margin: "0"
  },
  ".lm-table-sort": {
    alignItems: "center",
    backgroundColor: "transparent",
    border: "0",
    color: "inherit",
    cursor: "pointer",
    display: "inline-flex",
    font: "inherit",
    fontWeight: "700",
    gap: "0.375rem",
    padding: "0"
  },
  ".lm-table-sort[aria-sort='ascending']::after": { content: "'↑'", fontSize: "0.75rem" },
  ".lm-table-sort[aria-sort='descending']::after": { content: "'↓'", fontSize: "0.75rem" },
  ".lm-bulk-bar": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-primary-soft)",
    border: "1px solid var(--lm-color-primary)",
    borderRadius: "var(--lm-radius-lg)",
    color: "var(--lm-color-text)",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "space-between",
    padding: "0.75rem 1rem"
  },
  ".lm-empty-state": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px dashed var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-lg)",
    color: "var(--lm-color-muted)",
    display: "grid",
    gap: "0.75rem",
    justifyItems: "center",
    minHeight: "14rem",
    padding: "2rem",
    textAlign: "center"
  },
  ".lm-empty-state-title": {
    color: "var(--lm-color-text)",
    fontSize: "1rem",
    fontWeight: "700",
    margin: "0"
  },
  ".lm-stat-grid": {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))"
  },
  ".lm-stat": {
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-sm)",
    display: "grid",
    gap: "0.5rem",
    padding: "1.125rem 1.25rem",
    transition
  },
  ".lm-stat:hover": {
    boxShadow: "var(--lm-shadow-md)",
    transform: "translateY(-1px)"
  },
  ".lm-stat-label": {
    color: "var(--lm-color-muted)",
    fontSize: "0.75rem",
    fontWeight: "650",
    letterSpacing: "0.04em",
    textTransform: "uppercase"
  },
  ".lm-stat-value": {
    fontSize: "1.875rem",
    fontWeight: "750",
    letterSpacing: "-0.02em",
    lineHeight: "1.05"
  },
  ".lm-stat-trend": {
    alignItems: "center",
    color: "var(--lm-color-muted)",
    display: "inline-flex",
    fontSize: "0.8125rem",
    fontWeight: "650",
    gap: "0.375rem"
  },
  ".lm-stat-trend-up": { color: "var(--lm-color-success)" },
  ".lm-stat-trend-down": { color: "var(--lm-color-danger)" },
  ".lm-description-list": {
    display: "grid",
    gap: "0",
    gridTemplateColumns: "minmax(8rem, 0.45fr) minmax(0, 1fr)"
  },
  ".lm-description-list dt, .lm-description-list dd": {
    borderBottom: "1px solid var(--lm-color-border)",
    margin: "0",
    padding: "0.75rem 0"
  },
  ".lm-description-list dt": { color: "var(--lm-color-muted)", fontWeight: "650" },
  ".lm-description-list dd": { color: "var(--lm-color-text)" },
  ".lm-activity-feed": {
    display: "grid",
    gap: "1rem",
    listStyle: "none",
    margin: "0",
    padding: "0"
  },
  ".lm-activity-item": {
    alignItems: "flex-start",
    display: "grid",
    gap: "0.75rem",
    gridTemplateColumns: "auto minmax(0, 1fr)"
  },
  ".lm-activity-content": { display: "grid", gap: "0.25rem" },
  ".lm-activity-meta": { color: "var(--lm-color-muted)", fontSize: "0.8125rem" },
  ".lm-timeline": {
    display: "grid",
    gap: "1rem",
    listStyle: "none",
    margin: "0",
    padding: "0"
  },
  ".lm-timeline-item": {
    display: "grid",
    gap: "0.75rem",
    gridTemplateColumns: "1rem minmax(0, 1fr)",
    position: "relative"
  },
  ".lm-timeline-item::before": {
    backgroundColor: "var(--lm-color-border)",
    bottom: "-1rem",
    content: "''",
    left: "0.4375rem",
    position: "absolute",
    top: "1rem",
    width: "1px"
  },
  ".lm-timeline-item:last-child::before": { display: "none" },
  ".lm-timeline-dot": {
    backgroundColor: "var(--lm-color-primary)",
    borderRadius: "999px",
    boxShadow: "0 0 0 4px color-mix(in oklab, var(--lm-color-primary) 14%, transparent)",
    height: "0.875rem",
    marginTop: "0.25rem",
    width: "0.875rem"
  },
  ".lm-banner": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "space-between",
    padding: "0.875rem 1rem"
  },
  ".lm-banner-info": { borderColor: "var(--lm-color-info)" },
  ".lm-banner-success": { borderColor: "var(--lm-color-success)" },
  ".lm-banner-warning": { borderColor: "var(--lm-color-warning)" },
  ".lm-banner-danger": { borderColor: "var(--lm-color-danger)" },

  // -- Calendar ---------------------------------------------------------
  ".lm-calendar": {
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-sm)",
    color: "var(--lm-color-text)",
    display: "grid",
    gap: "0.75rem",
    padding: "0.875rem",
    width: "min(100%, 22rem)"
  },
  ".lm-calendar-header": {
    alignItems: "center",
    display: "flex",
    fontWeight: "650",
    gap: "0.5rem",
    justifyContent: "space-between"
  },
  ".lm-calendar-grid": {
    display: "grid",
    gap: "0.125rem",
    gridTemplateColumns: "repeat(7, 1fr)"
  },
  ".lm-calendar-weekday": {
    color: "var(--lm-color-muted)",
    fontSize: "0.6875rem",
    fontWeight: "700",
    letterSpacing: "0.04em",
    padding: "0.375rem 0",
    textAlign: "center",
    textTransform: "uppercase"
  },
  ".lm-calendar-day": {
    alignItems: "center",
    aspectRatio: "1",
    backgroundColor: "transparent",
    border: "0",
    borderRadius: "var(--lm-radius-md)",
    color: "var(--lm-color-text)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "0.8125rem",
    fontWeight: "550",
    justifyContent: "center",
    transition
  },
  ".lm-calendar-day:hover:not(:disabled)": {
    backgroundColor: "var(--lm-color-surface-raised)"
  },
  ".lm-calendar-day[aria-selected='true']": {
    backgroundColor: "var(--lm-color-primary)",
    color: "var(--lm-color-primary-fg)",
    fontWeight: "700"
  },
  ".lm-calendar-day[data-today='true'], .lm-calendar-day-today": {
    boxShadow: "inset 0 0 0 1px var(--lm-color-primary)",
    color: "var(--lm-color-primary)"
  },
  ".lm-calendar-day[data-outside='true'], .lm-calendar-day-outside": {
    color: "color-mix(in oklab, var(--lm-color-muted) 60%, transparent)"
  },
  ".lm-calendar-day:disabled": disabled,
  ".lm-calendar-day-range, .lm-calendar-day[data-range='middle']": {
    backgroundColor: "var(--lm-color-primary-soft)",
    borderRadius: "0",
    color: "var(--lm-color-primary)"
  },
  ".lm-calendar-day[data-range='start']": {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0"
  },
  ".lm-calendar-day[data-range='end']": {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0"
  },

  // -- Date picker (input + popover) ------------------------------------
  ".lm-datepicker": {
    display: "inline-block",
    position: "relative"
  },
  ".lm-datepicker-trigger": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: controlShadow,
    color: "var(--lm-color-text)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "0.875rem",
    gap: "0.5rem",
    minHeight: "calc(2.5rem * var(--lm-density))",
    padding: "0 calc(0.75rem * var(--lm-density))",
    transition
  },
  ".lm-datepicker-trigger:hover": {
    borderColor: "color-mix(in oklab, var(--lm-color-primary) 50%, var(--lm-color-border-strong))"
  },
  ".lm-datepicker-panel": {
    animation: "lm-pop var(--lm-duration-base) var(--lm-ease-spring)",
    position: "absolute",
    top: "calc(100% + 0.375rem)",
    transformOrigin: "top left",
    zIndex: "45"
  },

  // -- Combobox / Autocomplete -----------------------------------------
  ".lm-combobox": {
    display: "block",
    position: "relative"
  },
  ".lm-combobox-listbox": {
    animation: "lm-pop var(--lm-duration-base) var(--lm-ease-out)",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: "var(--lm-shadow-lg)",
    listStyle: "none",
    margin: "0.375rem 0 0",
    maxHeight: "20rem",
    overflowY: "auto",
    padding: "0.375rem",
    position: "absolute",
    width: "100%",
    zIndex: "45"
  },
  ".lm-combobox-listbox[hidden]": { display: "none" },
  ".lm-combobox-option": {
    alignItems: "center",
    borderRadius: "var(--lm-radius-sm)",
    color: "var(--lm-color-text)",
    cursor: "pointer",
    display: "flex",
    fontSize: "0.875rem",
    gap: "0.5rem",
    padding: "0.5rem 0.625rem",
    transition
  },
  ".lm-combobox-option:hover": {
    backgroundColor: "var(--lm-color-surface-raised)"
  },
  ".lm-combobox-option[aria-selected='true']": {
    backgroundColor: "var(--lm-color-primary-soft)",
    color: "var(--lm-color-primary)"
  },
  ".lm-combobox-option-meta": {
    color: "var(--lm-color-muted)",
    fontSize: "0.75rem",
    marginLeft: "auto"
  },

  // -- OTP / PIN field --------------------------------------------------
  ".lm-otp": {
    display: "inline-flex",
    gap: "0.5rem"
  },
  ".lm-otp-slot": {
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: controlShadow,
    color: "var(--lm-color-text)",
    fontFamily: "var(--font-mono, ui-monospace), monospace",
    fontSize: "1.25rem",
    fontWeight: "700",
    height: "3rem",
    padding: "0",
    textAlign: "center",
    transition,
    width: "2.5rem"
  },
  ".lm-otp-slot:focus-visible": {
    borderColor: "var(--lm-color-primary)",
    boxShadow: ring
  },
  ".lm-otp-slot[data-state='filled']": {
    borderColor: "var(--lm-color-primary)"
  },
  ".lm-otp-separator": {
    alignSelf: "center",
    color: "var(--lm-color-muted)"
  },

  // -- Number input -----------------------------------------------------
  ".lm-number-input": {
    alignItems: "stretch",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: controlShadow,
    display: "inline-flex",
    overflow: "hidden",
    transition,
    width: "9rem"
  },
  ".lm-number-input:focus-within": {
    borderColor: "var(--lm-color-primary)",
    boxShadow: ring
  },
  ".lm-number-input input": {
    background: "transparent",
    border: "0",
    color: "inherit",
    flex: "1",
    fontSize: "0.9375rem",
    fontWeight: "600",
    outline: "none",
    padding: "0 0.5rem",
    textAlign: "center",
    width: "100%"
  },
  ".lm-number-input button": {
    background: "var(--lm-color-surface-raised)",
    border: "0",
    color: "var(--lm-color-text)",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "700",
    padding: "0 0.625rem",
    transition
  },
  ".lm-number-input button:hover": {
    backgroundColor: "var(--lm-color-primary-soft)",
    color: "var(--lm-color-primary)"
  },

  // -- Carousel ---------------------------------------------------------
  ".lm-carousel": {
    display: "grid",
    gap: "0.75rem"
  },
  ".lm-carousel-track": {
    display: "flex",
    gap: "1rem",
    overflowX: "auto",
    padding: "0.25rem 0.125rem",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none"
  },
  ".lm-carousel-track::-webkit-scrollbar": {
    display: "none"
  },
  ".lm-carousel-item": {
    flex: "0 0 auto",
    scrollSnapAlign: "start",
    width: "min(20rem, 80%)"
  },
  ".lm-carousel-dots": {
    alignItems: "center",
    display: "flex",
    gap: "0.375rem",
    justifyContent: "center"
  },
  ".lm-carousel-dot": {
    backgroundColor: "var(--lm-color-border-strong)",
    border: "0",
    borderRadius: "999px",
    cursor: "pointer",
    height: "0.375rem",
    padding: "0",
    transition,
    width: "0.375rem"
  },
  ".lm-carousel-dot[aria-selected='true']": {
    backgroundColor: "var(--lm-color-primary)",
    width: "1.25rem"
  },

  // -- Split pane / Resizable handle -----------------------------------
  ".lm-split": {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
    minHeight: "16rem"
  },
  ".lm-split-vertical": {
    gridTemplateColumns: "none",
    gridTemplateRows: "minmax(0, 1fr) auto minmax(0, 1fr)"
  },
  ".lm-split-handle": {
    backgroundColor: "var(--lm-color-border)",
    cursor: "col-resize",
    flexShrink: "0",
    position: "relative",
    transition,
    width: "1px"
  },
  ".lm-split-handle::after": {
    backgroundColor: "var(--lm-color-border-strong)",
    borderRadius: "999px",
    content: "''",
    height: "2.5rem",
    inset: "50% auto auto 50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    transition,
    width: "0.25rem"
  },
  ".lm-split-handle:hover, .lm-split-handle[data-state='dragging']": {
    backgroundColor: "var(--lm-color-primary)"
  },
  ".lm-split-handle:hover::after": {
    backgroundColor: "var(--lm-color-primary)",
    height: "3rem"
  },
  ".lm-split-vertical .lm-split-handle": {
    cursor: "row-resize",
    height: "1px",
    width: "auto"
  },
  ".lm-split-vertical .lm-split-handle::after": {
    height: "0.25rem",
    width: "2.5rem"
  },

  // -- Hover card -------------------------------------------------------
  ".lm-hover-card": {
    display: "inline-block",
    position: "relative"
  },
  ".lm-hover-card-content": {
    animation: "lm-pop var(--lm-duration-base) var(--lm-ease-spring)",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-lg)",
    color: "var(--lm-color-text)",
    fontSize: "0.875rem",
    minWidth: "16rem",
    padding: "1rem",
    position: "absolute",
    top: "calc(100% + 0.5rem)",
    zIndex: "45"
  },
  ".lm-hover-card-content[hidden]": { display: "none" },

  // -- Context menu -----------------------------------------------------
  ".lm-context-menu": {
    animation: "lm-pop var(--lm-duration-base) var(--lm-ease-out)",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: "var(--lm-shadow-lg)",
    color: "var(--lm-color-text)",
    display: "grid",
    gap: "0.0625rem",
    minWidth: "12rem",
    padding: "0.25rem",
    position: "fixed",
    zIndex: "55"
  },
  ".lm-context-menu-item": {
    alignItems: "center",
    borderRadius: "var(--lm-radius-sm)",
    color: "var(--lm-color-text)",
    cursor: "pointer",
    display: "flex",
    fontSize: "0.8125rem",
    gap: "0.5rem",
    padding: "0.4375rem 0.625rem",
    transition
  },
  ".lm-context-menu-item:hover": {
    backgroundColor: "var(--lm-color-primary-soft)",
    color: "var(--lm-color-primary)"
  },
  ".lm-context-menu-item-danger:hover": {
    backgroundColor: "color-mix(in oklab, var(--lm-color-danger) 14%, var(--lm-color-surface))",
    color: "var(--lm-color-danger)"
  },
  ".lm-context-menu-shortcut": {
    color: "var(--lm-color-muted)",
    fontSize: "0.6875rem",
    marginLeft: "auto"
  },

  // -- Toggle group -----------------------------------------------------
  ".lm-toggle-group": {
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border-strong)",
    borderRadius: "var(--lm-radius-md)",
    display: "inline-flex",
    overflow: "hidden"
  },
  ".lm-toggle-group-item": {
    backgroundColor: "transparent",
    border: "0",
    borderRight: "1px solid var(--lm-color-border)",
    color: "var(--lm-color-muted)",
    cursor: "pointer",
    fontSize: "0.8125rem",
    fontWeight: "600",
    padding: "0.5rem 0.875rem",
    transition
  },
  ".lm-toggle-group-item:last-child": { borderRight: "0" },
  ".lm-toggle-group-item:hover": {
    backgroundColor: "var(--lm-color-surface-raised)",
    color: "var(--lm-color-text)"
  },
  ".lm-toggle-group-item[aria-pressed='true']": {
    backgroundColor: "var(--lm-color-primary)",
    color: "var(--lm-color-primary-fg)"
  },

  // -- Diff (added / removed lines) ------------------------------------
  ".lm-diff": {
    backgroundColor: "var(--lm-color-surface-sunken)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    fontFamily: "var(--font-mono, ui-monospace), monospace",
    fontSize: "0.8125rem",
    lineHeight: "1.65",
    overflow: "hidden"
  },
  ".lm-diff-line": {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "0.5rem",
    padding: "0.0625rem 0.875rem"
  },
  ".lm-diff-line-add": {
    backgroundColor: "color-mix(in oklab, var(--lm-color-success) 14%, transparent)",
    color: "var(--lm-color-success)"
  },
  ".lm-diff-line-add::before": { content: "'+'", color: "var(--lm-color-success)" },
  ".lm-diff-line-remove": {
    backgroundColor: "color-mix(in oklab, var(--lm-color-danger) 14%, transparent)",
    color: "var(--lm-color-danger)"
  },
  ".lm-diff-line-remove::before": { content: "'-'", color: "var(--lm-color-danger)" },
  ".lm-diff-line-meta::before": { content: "'@'", color: "var(--lm-color-muted)" },
  ".lm-diff-line-meta": {
    backgroundColor: "var(--lm-color-surface-raised)",
    color: "var(--lm-color-muted)"
  },

  // -- Sparkline (small inline chart container) ------------------------
  ".lm-sparkline": {
    color: "var(--lm-color-primary)",
    display: "inline-block",
    height: "1.5rem",
    width: "5rem"
  },
  ".lm-sparkline-area": {
    fill: "color-mix(in oklab, currentColor 18%, transparent)",
    stroke: "none"
  },
  ".lm-sparkline-line": {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  },

  // -- Inbox / Notification list --------------------------------------
  ".lm-inbox": {
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-lg)",
    boxShadow: "var(--lm-shadow-md)",
    display: "grid",
    maxHeight: "32rem",
    overflow: "hidden",
    width: "min(100%, 22rem)"
  },
  ".lm-inbox-header": {
    alignItems: "center",
    borderBottom: "1px solid var(--lm-color-border)",
    display: "flex",
    fontSize: "0.875rem",
    fontWeight: "700",
    justifyContent: "space-between",
    padding: "0.875rem 1rem"
  },
  ".lm-inbox-list": {
    display: "grid",
    listStyle: "none",
    margin: "0",
    overflowY: "auto",
    padding: "0"
  },
  ".lm-inbox-item": {
    alignItems: "flex-start",
    borderBottom: "1px solid var(--lm-color-border)",
    cursor: "pointer",
    display: "grid",
    gap: "0.5rem",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    padding: "0.875rem 1rem",
    transition
  },
  ".lm-inbox-item:last-child": { borderBottom: "0" },
  ".lm-inbox-item:hover": { backgroundColor: "var(--lm-color-surface-raised)" },
  ".lm-inbox-item[data-state='unread']": {
    backgroundColor: "var(--lm-color-primary-soft)"
  },
  ".lm-inbox-item-title": {
    fontSize: "0.875rem",
    fontWeight: "650",
    margin: "0"
  },
  ".lm-inbox-item-meta": {
    color: "var(--lm-color-muted)",
    fontSize: "0.75rem"
  },

  // -- Avatar stack overflow ------------------------------------------
  ".lm-avatar-stack-more": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface-raised)",
    border: "2px solid var(--lm-color-surface)",
    borderRadius: "999px",
    color: "var(--lm-color-muted)",
    display: "inline-flex",
    fontSize: "0.6875rem",
    fontWeight: "700",
    height: "2.5rem",
    justifyContent: "center",
    marginLeft: "-0.5rem",
    width: "2.5rem"
  },

  // -- Divider ----------------------------------------------------------
  ".lm-divider": {
    alignItems: "center",
    color: "var(--lm-color-muted)",
    display: "flex",
    fontSize: "0.75rem",
    fontWeight: "650",
    gap: "0.75rem",
    letterSpacing: "0.04em",
    margin: "1rem 0",
    textTransform: "uppercase"
  },
  ".lm-divider::before, .lm-divider::after": {
    backgroundColor: "var(--lm-color-border)",
    content: "''",
    flex: "1",
    height: "1px"
  },
  ".lm-divider-vertical": {
    backgroundColor: "var(--lm-color-border)",
    flexShrink: "0",
    margin: "0 0.75rem",
    width: "1px"
  },

  // -- Chat bubble ------------------------------------------------------
  ".lm-chat": {
    display: "grid",
    gap: "0.625rem"
  },
  ".lm-chat-message": {
    alignItems: "flex-start",
    display: "grid",
    gap: "0.625rem",
    gridTemplateColumns: "auto minmax(0, 1fr)"
  },
  ".lm-chat-message-self": {
    gridTemplateColumns: "minmax(0, 1fr) auto",
    justifyItems: "end"
  },
  ".lm-chat-bubble": {
    backgroundColor: "var(--lm-color-surface-raised)",
    borderRadius: "var(--lm-radius-lg)",
    color: "var(--lm-color-text)",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    maxWidth: "min(36rem, 100%)",
    padding: "0.625rem 0.875rem"
  },
  ".lm-chat-message-self .lm-chat-bubble": {
    backgroundColor: "var(--lm-color-primary)",
    color: "var(--lm-color-primary-fg)"
  },
  ".lm-chat-meta": {
    color: "var(--lm-color-muted)",
    fontSize: "0.6875rem",
    marginTop: "0.125rem"
  },

  // -- Mention chip ----------------------------------------------------
  ".lm-mention": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-primary-soft)",
    borderRadius: "var(--lm-radius-sm)",
    color: "var(--lm-color-primary)",
    display: "inline-flex",
    fontSize: "0.8125rem",
    fontWeight: "650",
    gap: "0.25rem",
    padding: "0.0625rem 0.375rem"
  },
  ".lm-mention::before": { content: "'@'" },

  // -- Rich text toolbar ------------------------------------------------
  ".lm-rt-toolbar": {
    alignItems: "center",
    backgroundColor: "var(--lm-color-surface)",
    border: "1px solid var(--lm-color-border)",
    borderRadius: "var(--lm-radius-md)",
    boxShadow: "var(--lm-shadow-sm)",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.125rem",
    padding: "0.25rem"
  },
  ".lm-rt-button": {
    alignItems: "center",
    backgroundColor: "transparent",
    border: "0",
    borderRadius: "var(--lm-radius-sm)",
    color: "var(--lm-color-muted)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "0.875rem",
    fontWeight: "600",
    height: "2rem",
    justifyContent: "center",
    minWidth: "2rem",
    padding: "0 0.4375rem",
    transition
  },
  ".lm-rt-button:hover": {
    backgroundColor: "var(--lm-color-surface-raised)",
    color: "var(--lm-color-text)"
  },
  ".lm-rt-button[aria-pressed='true']": {
    backgroundColor: "var(--lm-color-primary-soft)",
    color: "var(--lm-color-primary)"
  },
  ".lm-rt-divider": {
    backgroundColor: "var(--lm-color-border)",
    height: "1.25rem",
    margin: "0 0.25rem",
    width: "1px"
  },

  // -- Scroll area ------------------------------------------------------
  ".lm-scroll-area": {
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarColor:
      "color-mix(in oklab, var(--lm-color-text) 14%, transparent) transparent"
  },

  // -- Density modifiers ------------------------------------------------
  ".lm-density-compact": { "--lm-density": "0.88" },
  ".lm-density-comfortable": { "--lm-density": "1" },
  ".lm-density-spacious": { "--lm-density": "1.14" }
};
