import { lumoraThemes, requiredThemeTokens } from "@lumora-ui/themes";
import {
  DocsCallout,
  DocsCode,
  DocsLayout,
  DocsList,
  DocsParagraph,
  DocsSection
} from "../../../components/docs-layout";
import { ThemeSwitcher } from "../../../components/theme-switcher";

export const metadata = {
  title: "Theming — Lumora UI"
};

const switchExample = `// Anywhere in your app
document.documentElement.dataset.lmTheme = "lumora-dark";`;

const reactToggle = `// app/components/ThemeToggle.tsx
"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("lumora-light");

  useEffect(() => {
    document.documentElement.dataset.lmTheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="lm-select"
    >
      <option value="lumora-light">Light</option>
      <option value="lumora-dark">Dark</option>
      <option value="indigo-enterprise">Indigo</option>
    </select>
  );
}`;

const noFlash = `<!-- app/layout.html — inject in <head> -->
<script>
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t) document.documentElement.setAttribute('data-lm-theme', t);
    } catch (e) {}
  })();
</script>`;

const customTheme = `// my-app/lumora-themes.ts
import type { LumoraTheme } from "@lumora-ui/themes";

export const acmeTheme: LumoraTheme = {
  name: "acme",
  label: "Acme Corp",
  mode: "light",
  tokens: {
    "color-bg": "#fafaf9",
    "color-surface": "#ffffff",
    "color-surface-raised": "#f5f5f4",
    "color-surface-sunken": "#f0f0ef",
    "color-text": "#1c1917",
    "color-muted": "#57534e",
    "color-border": "#e7e5e4",
    "color-border-strong": "#d6d3d1",
    "color-primary": "#dc2626",       // Acme red
    "color-primary-fg": "#ffffff",
    "color-primary-soft": "color-mix(in oklab, var(--lm-color-primary) 14%, var(--lm-color-surface))",
    "color-secondary": "#1c1917",
    "color-secondary-fg": "#ffffff",
    "color-accent": "#0891b2",
    "color-accent-fg": "#ffffff",
    "color-success": "#15803d",
    "color-success-fg": "#ffffff",
    "color-warning": "#a16207",
    "color-warning-fg": "#ffffff",
    "color-danger": "#b91c1c",
    "color-danger-fg": "#ffffff",
    "color-info": "#0369a1",
    "color-info-fg": "#ffffff",
    "color-overlay": "rgb(28 25 23 / 0.55)",
    "color-focus-ring": "color-mix(in oklab, var(--lm-color-primary) 35%, transparent)",
    "radius-sm": "0.25rem",
    "radius-md": "0.5rem",
    "radius-lg": "0.75rem",
    "radius-xl": "1rem",
    "radius-2xl": "1.5rem",
    "shadow-sm": "0 1px 2px rgb(0 0 0 / 0.06)",
    "shadow-md": "0 4px 12px -2px rgb(0 0 0 / 0.08)",
    "shadow-lg": "0 12px 32px -8px rgb(0 0 0 / 0.16)",
    "shadow-xl": "0 24px 64px -12px rgb(0 0 0 / 0.22)",
    "shadow-glow": "0 0 0 1px rgb(220 38 38 / 0.18), 0 8px 24px -6px rgb(220 38 38 / 0.32)",
    "ease-out": "cubic-bezier(0.22, 1, 0.36, 1)",
    "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
    "duration-fast": "120ms",
    "duration-base": "180ms",
    "duration-slow": "260ms",
    density: "1"
  }
};`;

const registerTheme = `/* app/globals.css */
@import "tailwindcss";
@plugin "@lumora-ui/core" {
  themes: ["lumora-light", "lumora-dark", "acme"];
  defaultTheme: "acme";
}`;

const tenantTheme = `// app/page.tsx
export default async function TenantPage({ params }) {
  const tenant = await getTenant(params.tenant);
  return (
    <div data-lm-theme={tenant.themeName}>
      {/* every Lumora component inside picks up the tenant brand */}
    </div>
  );
}`;

const densityExample = `<!-- Per-page density -->
<body data-lm-density="compact">
  <!-- All controls render 12% more compact -->
</body>

<!-- Per-region density -->
<section class="lm-density-spacious">
  <!-- This region renders 14% more spacious -->
</section>`;

const toc = [
  { id: "model", label: "Token model" },
  { id: "switch", label: "Switching themes" },
  { id: "preview", label: "Live preview" },
  { id: "no-flash", label: "Avoiding the flash" },
  { id: "custom", label: "Building a custom theme" },
  { id: "tenant", label: "Per-tenant theming" },
  { id: "density", label: "Density modes" },
  { id: "all-themes", label: "Built-in themes" }
];

const lightThemes = lumoraThemes.filter((t) => t.mode === "light");
const darkThemes = lumoraThemes.filter((t) => t.mode === "dark");

export default function ThemingPage() {
  return (
    <DocsLayout
      current="/docs/theming"
      eyebrow="Theming · 8 min"
      title="Token-driven theming"
      description={`Lumora ships ${lumoraThemes.length} themes built from ${requiredThemeTokens.length} CSS tokens. Switch the active theme with a single attribute. Override tokens to brand-match in minutes.`}
      toc={toc}
      prev={{ href: "/docs/installation", label: "Installation" }}
      next={{ href: "/docs/tokens", label: "Design tokens" }}
    >
      <DocsSection id="model" title="The token model">
        <DocsParagraph>
          Every Lumora component reads its surface, color, radius, shadow, and motion values from
          CSS variables prefixed <code className="lm-code">--lm-*</code>. A theme is a complete
          assignment of values to those variables.
        </DocsParagraph>
        <DocsList
          items={[
            <>
              <strong>Color</strong>: surfaces (bg, surface, surface-raised, surface-sunken), text,
              borders, and 7 semantic accents (primary, secondary, accent, success, warning, danger,
              info).
            </>,
            <>
              <strong>Radius</strong>: 5 steps from <code className="lm-code">sm</code> (0.25rem) to{" "}
              <code className="lm-code">2xl</code> (1.5rem).
            </>,
            <>
              <strong>Shadow</strong>: 5 elevation steps including a{" "}
              <code className="lm-code">glow</code> variant for primary actions.
            </>,
            <>
              <strong>Motion</strong>: spring + ease-out curves and 3 duration tokens. Auto-disabled
              under <code className="lm-code">prefers-reduced-motion</code>.
            </>,
            <>
              <strong>Density</strong>: a single multiplier that scales control padding and gaps.
            </>
          ]}
        />
        <DocsCallout tone="info" title="Derived tokens">
          Some tokens are derived via <code className="lm-code">color-mix</code> at the CSS layer —
          for example <code className="lm-code">--lm-color-primary-soft</code> tracks{" "}
          <code className="lm-code">--lm-color-primary</code> automatically across every theme. You
          only need to set the base color.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="switch" title="Switching themes">
        <DocsParagraph>
          Set <code className="lm-code">data-lm-theme</code> on any ancestor of your components.
          Most apps put it on <code className="lm-code">&lt;html&gt;</code>.
        </DocsParagraph>
        <DocsCode filename="anywhere.ts" code={switchExample} />
        <DocsParagraph>
          Here's a typed React toggle that persists to <code className="lm-code">localStorage</code>
          :
        </DocsParagraph>
        <DocsCode filename="app/components/ThemeToggle.tsx" code={reactToggle} />
      </DocsSection>

      <DocsSection id="preview" title="Live preview">
        <DocsParagraph>
          Pick a theme to apply it to the entire docs site — including this page. The choice
          persists across navigation and reloads.
        </DocsParagraph>
        <div className="lm-card">
          <div className="lm-card-header flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="lm-card-title">Theme switcher</h3>
              <p className="lm-card-subtitle">
                Driven by <code className="lm-code">data-lm-theme</code> on{" "}
                <code className="lm-code">&lt;html&gt;</code>.
              </p>
            </div>
            <ThemeSwitcher />
          </div>
          <div className="lm-card-body grid gap-4">
            <div className="flex flex-wrap gap-2">
              <button className="lm-btn lm-btn-primary">Primary</button>
              <button className="lm-btn lm-btn-secondary">Secondary</button>
              <button className="lm-btn lm-btn-outline">Outline</button>
              <button className="lm-btn lm-btn-danger">Danger</button>
            </div>
            <div className="lm-alert lm-alert-success">
              <span aria-hidden>✓</span>
              <div>
                <p className="lm-alert-title">Tokens cascade through every component</p>
                <p className="lm-hint">
                  Buttons, alerts, focus rings, and shadows all derive from the active theme.
                </p>
              </div>
            </div>
            <progress className="lm-progress" value={68} max={100} />
          </div>
        </div>
      </DocsSection>

      <DocsSection id="no-flash" title="Avoiding the dark→light flash">
        <DocsParagraph>
          If you persist user theme choice in <code className="lm-code">localStorage</code>, inject
          this 6-line script in <code className="lm-code">&lt;head&gt;</code>. It runs before paint,
          so the user never sees a flash of the wrong theme.
        </DocsParagraph>
        <DocsCode filename="app/layout.html" code={noFlash} />
      </DocsSection>

      <DocsSection id="custom" title="Building a custom theme">
        <DocsParagraph>
          A theme is a plain object that satisfies the <code className="lm-code">LumoraTheme</code>{" "}
          type. Fork an existing one or build from scratch — the contract is{" "}
          {requiredThemeTokens.length} tokens.
        </DocsParagraph>
        <DocsCode filename="my-app/lumora-themes.ts" code={customTheme} />
        <DocsParagraph>
          Pass it to the plugin via the <code className="lm-code">themes</code> option. Pass{" "}
          <code className="lm-code">defaultTheme</code> to set the boot fallback.
        </DocsParagraph>
        <DocsCode filename="app/globals.css" code={registerTheme} />
        <DocsCallout tone="success" title="WCAG AA, automatically">
          Lumora ships a contrast test that verifies{" "}
          <code className="lm-code">color-bg / color-text</code>,{" "}
          <code className="lm-code">color-primary / color-primary-fg</code>, and 8 other pairs at AA
          across every theme. Run <code className="lm-code">pnpm test</code> to validate custom
          themes too.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="tenant" title="Per-tenant theming">
        <DocsParagraph>
          For multi-tenant SaaS, set <code className="lm-code">data-lm-theme</code> on a wrapping
          element instead of <code className="lm-code">&lt;html&gt;</code>. Lumora components inside
          the wrapper read the nearest ancestor — branding switches per region without forking your
          component code.
        </DocsParagraph>
        <DocsCode filename="app/page.tsx" code={tenantTheme} />
      </DocsSection>

      <DocsSection id="density" title="Density modes">
        <DocsParagraph>
          Density scales control padding and gap proportionally. Use it for compact data tables,
          enterprise admin dense screens, or generous marketing pages — without adjusting any
          spacing classes.
        </DocsParagraph>
        <DocsCode filename="density.html" code={densityExample} lang="html" />
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { name: "compact", scale: "0.88×", desc: "Dense tables and admin views" },
            { name: "comfortable", scale: "1.00×", desc: "Default for app shells" },
            { name: "spacious", scale: "1.14×", desc: "Marketing and onboarding" }
          ].map((d) => (
            <div className={`lm-card lm-density-${d.name}`} key={d.name}>
              <div className="lm-card-body grid gap-2">
                <strong>{d.name}</strong>
                <span className="text-xs text-[var(--lm-color-muted)]">{d.scale}</span>
                <p className="lm-hint text-xs">{d.desc}</p>
                <button className="lm-btn lm-btn-primary lm-btn-sm">Save</button>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="all-themes" title={`All ${lumoraThemes.length} built-in themes`}>
        <DocsParagraph>
          Every theme below is a complete drop-in. Click a swatch to copy the{" "}
          <code className="lm-code">data-lm-theme</code> value.
        </DocsParagraph>
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--lm-color-muted)]">
          Light · {lightThemes.length} themes
        </h3>
        <ThemeGrid themes={lightThemes} />
        <h3 className="mt-4 text-sm font-bold uppercase tracking-wider text-[var(--lm-color-muted)]">
          Dark · {darkThemes.length} themes
        </h3>
        <ThemeGrid themes={darkThemes} />
      </DocsSection>
    </DocsLayout>
  );
}

function ThemeGrid({ themes }: { themes: typeof lumoraThemes }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {themes.map((theme) => (
        <div
          key={theme.name}
          data-lm-theme={theme.name}
          data-testid="theme-card"
          className="lm-card"
          style={{ background: "var(--lm-color-surface)" }}
        >
          <div className="lm-card-body grid gap-3">
            <div className="flex items-center justify-between">
              <strong className="text-sm">{theme.label}</strong>
              <span className="lm-badge lm-badge-soft text-xs">{theme.mode}</span>
            </div>
            <div className="flex gap-1.5">
              {[
                "var(--lm-color-primary)",
                "var(--lm-color-accent)",
                "var(--lm-color-success)",
                "var(--lm-color-warning)",
                "var(--lm-color-danger)"
              ].map((c, i) => (
                <span key={i} className="h-7 flex-1 rounded-md" style={{ background: c }} />
              ))}
            </div>
            <code className="lm-code text-[10px] truncate">data-lm-theme="{theme.name}"</code>
          </div>
        </div>
      ))}
    </div>
  );
}
