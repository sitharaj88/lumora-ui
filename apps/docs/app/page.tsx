import Link from "next/link";
import { lumoraThemes, requiredThemeTokens } from "@lumora-design/themes";
import { AreaChart } from "../components/chart";
import { CodeCopy } from "../components/code-copy";
import { DocsFooter } from "../components/footer";
import { DocsNav } from "../components/docs-nav";
import { Icon } from "../components/icon";
import { categoryOrder, componentCatalog, componentsByCategory } from "../lib/catalog";
import { templates } from "../lib/templates";

const installCss = `/* app/globals.css */
@import "tailwindcss";
@plugin "@lumora-design/core";`;

const installShell = `pnpm add @lumora-design/core
# or: npm install @lumora-design/core
# optional adapters
pnpm add @lumora-design/react   # React adapter
pnpm add @lumora-design/vue     # Vue adapter`;

const reactExample = `// app/billing/AccountCard.tsx
import { LumoraButton, LumoraCard } from "@lumora-design/react";

export function AccountCard() {
  return (
    <LumoraCard variant="glass">
      <LumoraCard.Header>
        <LumoraCard.Title>Account settings</LumoraCard.Title>
      </LumoraCard.Header>
      <LumoraCard.Body>
        <LumoraButton variant="primary">Save changes</LumoraButton>
      </LumoraCard.Body>
    </LumoraCard>
  );
}`;

const features = [
  {
    icon: "spark" as const,
    eyebrow: "Motion",
    title: "Tactile animations baked in",
    body: "Spring eases on overlays, ease-out on state changes, shimmer on skeletons. Auto-disabled under prefers-reduced-motion."
  },
  {
    icon: "shield" as const,
    eyebrow: "Accessibility",
    title: "WCAG AA, verified in CI",
    body: "Every theme passes the contrast suite. Every primitive ships keyboard states, focus rings, and ARIA semantics."
  },
  {
    icon: "palette" as const,
    eyebrow: "Theming",
    title: "Multi-tenant from day one",
    body: `${requiredThemeTokens.length} tokens drive every surface. Switch the active theme with a single data attribute on <html>.`
  },
  {
    icon: "layers" as const,
    eyebrow: "Surfaces",
    title: "Glass, gradient, sunken",
    body: "Three surface tiers and gradient variants give cards, navbars, and panels a single material language."
  },
  {
    icon: "command" as const,
    eyebrow: "Enterprise primitives",
    title: "What real apps need",
    body: "Command palette, calendar, stepper, accordion, popover, dropzone, OTP, slider, segmented — out of the box."
  },
  {
    icon: "code" as const,
    eyebrow: "DX",
    title: "Framework agnostic, typed wrappers",
    body: "Plain Tailwind plugin. Optional React + Vue adapters emit the same lm-* classes with typed props."
  }
];

// Real numbers pulled from actual exports — never go stale
const stats = [
  { value: componentCatalog.length.toString(), label: "Components" },
  { value: lumoraThemes.length.toString(), label: "Themes" },
  { value: requiredThemeTokens.length.toString(), label: "Tokens" },
  { value: "AA", label: "WCAG" }
];

const featuredThemes = [
  "lumora-light",
  "lumora-dark",
  "indigo-enterprise",
  "emerald-ledger",
  "rose-compliance",
  "amber-ops",
  "violet-suite",
  "graphite-command",
  "ocean",
  "berry-dark",
  "carbon",
  "aurora-dark"
]
  .map((name) => lumoraThemes.find((t) => t.name === name))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

export default function Home() {
  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-20 pb-16 lg:grid-cols-[1fr_1fr] lg:pt-28">
        <div className="grid content-center gap-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="lm-badge lm-badge-soft lm-badge-dot">v1.0 · Tailwind v4 plugin</span>
            <span className="lm-badge lm-badge-outline">MIT licensed</span>
            <span className="lm-badge lm-badge-outline">SSR-safe</span>
          </div>

          <h1 className="text-balance text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            <span className="docs-headline">A design system</span>
            <br />
            <span className="docs-accent-text">teams ship with.</span>
          </h1>

          <p className="max-w-xl text-lg leading-8 text-[var(--lm-color-muted)]">
            {componentCatalog.length} semantic components, {lumoraThemes.length} themes, motion and
            accessibility verified in CI. Built on a single Tailwind plugin so your bundle stays
            tree-shaken and your markup stays readable.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link className="lm-btn lm-btn-primary lm-btn-lg" href="/components">
              Browse {componentCatalog.length} components
            </Link>
            <Link className="lm-btn lm-btn-outline lm-btn-lg" href="/docs/installation">
              Install in 2 lines
            </Link>
          </div>

          <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--lm-color-muted)]">
            <div className="flex items-center gap-2">
              <span className="lm-badge lm-badge-success lm-badge-dot" aria-hidden />
              <dt className="sr-only">Status</dt>
              <dd>WCAG AA verified in CI</dd>
            </div>
            <div className="flex items-center gap-2">
              <span className="lm-badge lm-badge-success lm-badge-dot" aria-hidden />
              <dd>Zero runtime CSS-in-JS</dd>
            </div>
            <div className="flex items-center gap-2">
              <span className="lm-badge lm-badge-success lm-badge-dot" aria-hidden />
              <dd>RTL + reduced motion built-in</dd>
            </div>
          </dl>
        </div>

        <HeroPreview />
      </section>

      {/* ============================================================
          STAT TICKER
      ============================================================ */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="docs-stat-ticker grid grid-cols-2 divide-[var(--lm-color-border)] sm:grid-cols-4 sm:divide-x">
          {stats.map((stat) => (
            <div key={stat.label} className="grid gap-1 px-6 py-7 text-center">
              <span className="text-4xl font-bold tracking-tight md:text-5xl">
                <span className="docs-accent-text">{stat.value}</span>
              </span>
              <span className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          FEATURE GRID
      ============================================================ */}
      <section className="mx-auto mt-24 max-w-7xl px-6">
        <div className="grid gap-3 text-center">
          <span className="docs-section-eyebrow justify-self-center">What's inside</span>
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
            <span className="docs-headline">Beyond a CSS kit.</span>{" "}
            <span className="docs-accent-text">A design system you can trust.</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="docs-feature-card p-6">
              <div className="grid gap-3">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[var(--lm-color-primary)]"
                  style={{ background: "var(--lm-color-primary-soft)" }}
                >
                  <Icon name={feature.icon} size={22} />
                </span>
                <span className="docs-section-eyebrow">{feature.eyebrow}</span>
                <h3 className="text-lg font-bold tracking-tight">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--lm-color-muted)]">
                  {feature.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================
          THEME STRIP — real themes, real swatches
      ============================================================ */}
      <section className="mx-auto mt-24 max-w-7xl px-6">
        <div className="grid gap-3 text-center">
          <span className="docs-section-eyebrow justify-self-center">
            {lumoraThemes.length} production themes
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            <span className="docs-accent-text">One token contract.</span>{" "}
            <span className="docs-headline">Every brand.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[var(--lm-color-muted)]">
            Switch the active theme with a single <code className="lm-code">data-lm-theme</code>{" "}
            attribute on <code className="lm-code">&lt;html&gt;</code>. Build per-tenant brands
            without forking your component code.
          </p>
        </div>
        <div className="docs-marquee-mask mt-10">
          <div className="docs-marquee">
            {[...featuredThemes, ...featuredThemes].map((theme, idx) => (
              <div
                key={`${theme.name}-${idx}`}
                data-lm-theme={theme.name}
                className="lm-card w-72 shrink-0"
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
                  <div className="flex items-center gap-2">
                    <button className="lm-btn lm-btn-primary lm-btn-sm flex-1">Primary</button>
                    <button className="lm-btn lm-btn-outline lm-btn-sm">Outline</button>
                  </div>
                  <code className="lm-code text-[10px] truncate">data-lm-theme="{theme.name}"</code>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link className="lm-btn lm-btn-outline lm-btn-sm" href="/api#themes">
            Browse all {lumoraThemes.length} themes →
          </Link>
        </div>
      </section>

      {/* ============================================================
          CATEGORY MAP — every category, real counts
      ============================================================ */}
      <section className="mx-auto mt-24 max-w-7xl px-6">
        <div className="grid gap-3">
          <span className="docs-section-eyebrow">Component map</span>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              <span className="docs-headline">{componentCatalog.length} primitives,</span>{" "}
              <span className="docs-accent-text">{categoryOrder.length} categories.</span>
            </h2>
            <Link className="lm-btn lm-btn-outline lm-btn-sm" href="/components">
              See the full catalog →
            </Link>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {componentsByCategory
            .filter((c) => c.components.length > 0)
            .map(({ category, components }) => (
              <Link
                key={category}
                href={`/components#${category.toLowerCase()}`}
                className="docs-feature-card grid gap-3 p-5 no-underline"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-base text-[var(--lm-color-text)]">{category}</strong>
                  <span className="lm-badge lm-badge-soft text-xs">{components.length}</span>
                </div>
                <ul className="grid gap-1 text-sm text-[var(--lm-color-muted)]">
                  {components.slice(0, 4).map((c) => (
                    <li key={c.slug}>{c.name}</li>
                  ))}
                  {components.length > 4 && (
                    <li className="text-xs">+ {components.length - 4} more</li>
                  )}
                </ul>
              </Link>
            ))}
        </div>
      </section>

      {/* ============================================================
          INSTALL — real code, two windows
      ============================================================ */}
      <section
        id="install"
        className="mx-auto mt-24 grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center"
      >
        <div className="grid content-start gap-4">
          <span className="docs-section-eyebrow">Install</span>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            <span className="docs-headline">Two lines.</span>{" "}
            <span className="docs-accent-text">Any Tailwind v4 project.</span>
          </h2>
          <p className="max-w-xl text-[var(--lm-color-muted)]">
            Add the plugin to your CSS, install the package, and every{" "}
            <code className="lm-code">lm-*</code> class is available. No build config, no adapters
            required.
          </p>
          <CodeCopy code={installShell} />
          <p className="text-xs text-[var(--lm-color-muted)]">
            Tailwind v4 strips unused classes — your CSS only ships what you use.
          </p>
        </div>
        <div className="grid gap-4">
          <CodeWindow filename="app/globals.css" code={installCss} />
          <CodeWindow filename="app/billing/AccountCard.tsx" code={reactExample} />
        </div>
      </section>

      {/* ============================================================
          COMPARISON
      ============================================================ */}
      <section className="mx-auto mt-24 max-w-7xl px-6">
        <div className="grid gap-3">
          <span className="docs-section-eyebrow">Honest comparison</span>
          <h2 className="max-w-3xl text-balance text-3xl font-bold tracking-tight md:text-4xl">
            <span className="docs-headline">Where Lumora stands</span>{" "}
            <span className="docs-accent-text">vs. the usual options.</span>
          </h2>
        </div>
        <div className="mt-8 docs-feature-card overflow-hidden">
          <table className="lm-table">
            <thead>
              <tr>
                <th></th>
                <th>
                  <span className="docs-accent-text font-bold">Lumora UI</span>
                </th>
                <th>daisyUI</th>
                <th>shadcn/ui</th>
                <th>Tailwind UI</th>
                <th>Mantine</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Components (CSS)",
                  `${componentCatalog.length}`,
                  "61",
                  "—",
                  "500+ blocks",
                  "100+"
                ],
                ["Themes", lumoraThemes.length.toString(), "35", "1", "1", "2"],
                ["Typed React adapter", "126 components", "—", "Yes", "Paid", "Yes"],
                ["Typed Vue adapter", "131 components", "—", "—", "—", "—"],
                ["Motion + spring tokens", "Yes", "—", "—", "—", "Yes"],
                ["WCAG AA verified in CI", "Yes", "—", "—", "—", "Partial"],
                ["Multi-tenant theme runtime", "Yes", "Partial", "—", "—", "Partial"],
                ["Page-level templates", "6 ready", "—", "Several", "500+ blocks", "—"],
                ["License", "MIT", "MIT", "MIT", "Paid", "MIT"]
              ].map((row, i) => (
                <tr key={i}>
                  <td>
                    <strong>{row[0]}</strong>
                  </td>
                  <td>
                    <span className="lm-badge lm-badge-success lm-badge-dot">{row[1]}</span>
                  </td>
                  <td className="text-[var(--lm-color-muted)]">{row[2]}</td>
                  <td className="text-[var(--lm-color-muted)]">{row[3]}</td>
                  <td className="text-[var(--lm-color-muted)]">{row[4]}</td>
                  <td className="text-[var(--lm-color-muted)]">{row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[var(--lm-color-muted)]">
          Numbers verified against each project's documentation as of April 2026. Lumora
          components/themes counts come from the live exports — they update on every release.
        </p>
      </section>

      {/* ============================================================
          TEMPLATES TEASER
      ============================================================ */}
      <section className="mx-auto mt-24 max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="grid gap-2">
            <span className="docs-section-eyebrow">Templates</span>
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              <span className="docs-headline">Ship in a day,</span>{" "}
              <span className="docs-accent-text">not a quarter.</span>
            </h2>
          </div>
          <Link className="lm-btn lm-btn-outline lm-btn-sm" href="/templates">
            All {templates.length} templates →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((tpl) => (
            <Link
              key={tpl.slug}
              href={`/templates/${tpl.slug}`}
              className="docs-feature-card grid gap-3 p-5 no-underline"
            >
              <div className="flex items-center justify-between">
                <span className="docs-section-eyebrow">{tpl.category}</span>
                <span className="text-xs text-[var(--lm-color-muted)]">
                  {tpl.componentsUsed.length} components
                </span>
              </div>
              <strong className="text-base text-[var(--lm-color-text)]">{tpl.name}</strong>
              <p className="line-clamp-2 text-sm text-[var(--lm-color-muted)]">{tpl.description}</p>
              <div className="mt-auto flex items-center justify-between text-xs text-[var(--lm-color-muted)]">
                <span>View live</span>
                <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          CTA — honest, no fake sales pitch
      ============================================================ */}
      <section className="mx-auto mt-24 max-w-7xl px-6">
        <div
          className="docs-feature-card grid gap-6 p-10 md:grid-cols-[1.4fr_1fr] md:items-center"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 14%, var(--lm-color-surface)), color-mix(in oklab, var(--lm-color-accent) 10%, var(--lm-color-surface)) 80%)"
          }}
        >
          <div className="grid gap-3">
            <span className="docs-section-eyebrow">Get started</span>
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              <span className="docs-headline">Read the docs.</span>{" "}
              <span className="docs-accent-text">Or just install.</span>
            </h2>
            <p className="text-[var(--lm-color-muted)]">
              Lumora is open source under MIT. Add the Tailwind plugin to any project and start
              shipping. Adapters and templates come along for the ride.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Link className="lm-btn lm-btn-primary lm-btn-lg" href="/docs/installation">
              Read the docs
            </Link>
            <a
              className="lm-btn lm-btn-outline lm-btn-lg"
              href="https://github.com/sitharaj88/lumora-design"
              rel="noreferrer"
            >
              View source
            </a>
          </div>
        </div>
      </section>

      <DocsFooter />
    </main>
  );
}

// ============================================================
// HERO PREVIEW — real interactive composition
// ============================================================
function HeroPreview() {
  return (
    <div className="relative">
      {/* Floating chart card behind */}
      <div
        className="docs-float docs-float-delay lm-card absolute -left-2 top-44 z-0 hidden w-72 sm:block"
        style={{ background: "var(--lm-color-surface)" }}
      >
        <div className="lm-card-body grid gap-2 p-4">
          <span className="lm-stat-label">API latency p95</span>
          <span className="lm-stat-value">128ms</span>
          <AreaChart
            height={64}
            showGrid={false}
            showLegend={false}
            series={[
              {
                label: "Latency",
                color: "primary",
                values: [42, 48, 52, 56, 62, 68, 72, 78, 84, 92, 102, 118, 132, 148, 168, 184]
              }
            ]}
          />
        </div>
      </div>

      {/* Main glass preview */}
      <div className="docs-float lm-card lm-card-glass relative z-10 ml-auto max-w-md">
        <div className="lm-card-header flex items-center justify-between gap-4">
          <div>
            <h2 className="lm-card-title">Atlas Finance</h2>
            <p className="lm-hint">Compliance review · 7 min ago</p>
          </div>
          <span className="lm-badge lm-badge-warning lm-badge-dot">Review</span>
        </div>
        <div className="lm-card-body grid gap-4">
          <div className="lm-segmented" role="tablist" aria-label="Time range">
            <button className="lm-segmented-item">24h</button>
            <button className="lm-segmented-item" aria-pressed="true">
              7 days
            </button>
            <button className="lm-segmented-item">30 days</button>
          </div>

          <ol className="lm-stepper">
            <li className="lm-step lm-step-complete">
              <span className="lm-step-marker" />
            </li>
            <li className="lm-step lm-step-complete">
              <span className="lm-step-marker" />
            </li>
            <li className="lm-step" aria-current="step">
              <span className="lm-step-marker" />
            </li>
            <li className="lm-step">
              <span className="lm-step-marker" />
            </li>
          </ol>

          <div className="lm-alert lm-alert-warning">
            <Icon name="bolt" />
            <div>
              <p className="lm-alert-title">2 risk items pending</p>
              <p className="lm-hint">SLA expires Friday at 5 PM PT.</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="lm-avatar-group">
              <span className="lm-avatar lm-avatar-sm">AL</span>
              <span
                className="lm-avatar lm-avatar-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--lm-color-accent), var(--lm-color-info))"
                }}
              >
                MK
              </span>
              <span
                className="lm-avatar lm-avatar-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--lm-color-success), var(--lm-color-info))"
                }}
              >
                RS
              </span>
              <span className="lm-avatar-stack-more">+5</span>
            </div>
            <button className="lm-btn lm-btn-primary lm-btn-sm">Continue review</button>
          </div>
        </div>
      </div>

      {/* Floating toast in front */}
      <div className="docs-float lm-toast lm-toast-success absolute -right-2 -top-4 z-20 hidden w-72 md:flex">
        <span className="lm-spinner" aria-hidden="true" />
        <div>
          <p className="lm-toast-title">Backup completed</p>
          <p className="lm-hint">128 GB encrypted to vault.</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CODE WINDOW
// ============================================================
function CodeWindow({ filename, code }: { filename: string; code: string }) {
  return (
    <div className="docs-code-window">
      <div className="docs-code-window-header">
        <span className="docs-code-window-dot" />
        <span className="docs-code-window-dot" />
        <span className="docs-code-window-dot" />
        <span className="ml-2 text-xs text-[var(--lm-color-muted)]">{filename}</span>
      </div>
      <pre className="docs-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}
