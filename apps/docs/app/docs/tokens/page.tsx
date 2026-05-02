import { lumoraThemes, requiredThemeTokens } from "@lumora-design/themes";
import {
  DocsCallout,
  DocsCode,
  DocsLayout,
  DocsParagraph,
  DocsSection
} from "../../../components/docs-layout";

export const metadata = {
  title: "Design tokens — Lumora UI"
};

const usageExample = `/* Use any token from any CSS file */
.my-card {
  background: var(--lm-color-surface);
  border: 1px solid var(--lm-color-border);
  border-radius: var(--lm-radius-lg);
  box-shadow: var(--lm-shadow-md);
  transition: box-shadow var(--lm-duration-base) var(--lm-ease-out);
}

.my-card:hover {
  box-shadow: var(--lm-shadow-glow);
}`;

const colorGroups = [
  {
    title: "Surfaces",
    description: "Backgrounds and elevation tiers — every Lumora surface uses one of these.",
    tokens: ["color-bg", "color-surface", "color-surface-raised", "color-surface-sunken"]
  },
  {
    title: "Text & borders",
    description: "Foreground hierarchy and border emphasis levels.",
    tokens: ["color-text", "color-muted", "color-border", "color-border-strong"]
  },
  {
    title: "Brand",
    description: "Primary, secondary, accent — paired foreground colors meet WCAG AA.",
    tokens: [
      "color-primary",
      "color-primary-fg",
      "color-primary-soft",
      "color-secondary",
      "color-secondary-fg",
      "color-accent",
      "color-accent-fg"
    ]
  },
  {
    title: "Semantic",
    description: "State and feedback colors. Pair color with text/icon — never color alone.",
    tokens: [
      "color-success",
      "color-success-fg",
      "color-warning",
      "color-warning-fg",
      "color-danger",
      "color-danger-fg",
      "color-info",
      "color-info-fg"
    ]
  },
  {
    title: "Effects",
    description: "Modal backdrops and focus indicators. Both derive from the active theme.",
    tokens: ["color-overlay", "color-focus-ring"]
  }
];

const radiusTokens = ["radius-sm", "radius-md", "radius-lg", "radius-xl", "radius-2xl"];
const shadowTokens = ["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "shadow-glow"];
const motionTokens = ["ease-out", "ease-spring", "duration-fast", "duration-base", "duration-slow"];

const toc = [
  { id: "usage", label: "Using tokens" },
  { id: "colors", label: "Colors" },
  { id: "radius", label: "Radius" },
  { id: "shadow", label: "Shadow" },
  { id: "motion", label: "Motion" },
  { id: "density", label: "Density" }
];

const lightTheme = lumoraThemes.find((t) => t.name === "lumora-light")!;

export default function TokensPage() {
  return (
    <DocsLayout
      current="/docs/tokens"
      eyebrow="Reference"
      title="Design tokens"
      description={`Every theme provides ${requiredThemeTokens.length} tokens. Components consume them as --lm-* CSS variables. Override any of them at runtime to brand-match.`}
      toc={toc}
      prev={{ href: "/docs/theming", label: "Theming" }}
      next={{ href: "/docs/migration", label: "Versioning" }}
    >
      <DocsSection id="usage" title="Using tokens">
        <DocsParagraph>
          Tokens are emitted as plain CSS variables on the active theme selector. Use them anywhere
          — your own components, third-party widgets, or marketing pages — and they'll stay in sync
          with the active theme.
        </DocsParagraph>
        <DocsCode filename="my-styles.css" code={usageExample} lang="css" />
        <DocsCallout tone="info" title="Color-mix is fair game">
          Mix tokens with each other or with transparent for soft tints:{" "}
          <code className="lm-code">
            color-mix(in oklab, var(--lm-color-primary) 14%, transparent)
          </code>
          .
        </DocsCallout>
      </DocsSection>

      <DocsSection id="colors" title="Colors">
        {colorGroups.map((group) => (
          <div className="grid gap-3" key={group.title}>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold tracking-tight">{group.title}</h3>
              <p className="text-sm text-[var(--lm-color-muted)]">{group.description}</p>
            </div>
            <div className="docs-feature-card overflow-hidden">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th>Swatch</th>
                    <th>Token</th>
                    <th>CSS variable</th>
                    <th>Light value</th>
                  </tr>
                </thead>
                <tbody>
                  {group.tokens.map((token) => (
                    <tr key={token}>
                      <td style={{ width: "3rem" }}>
                        <span
                          className="block h-8 w-8 rounded-md border border-[var(--lm-color-border)]"
                          style={{ background: `var(--lm-${token})` }}
                          aria-hidden
                        />
                      </td>
                      <td>
                        <strong className="text-sm">{token}</strong>
                      </td>
                      <td>
                        <code className="lm-code">--lm-{token}</code>
                      </td>
                      <td className="text-xs text-[var(--lm-color-muted)]">
                        <code className="lm-code text-xs">
                          {(lightTheme.tokens as Record<string, string>)[token]}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </DocsSection>

      <DocsSection id="radius" title="Radius">
        <DocsParagraph>
          5 radius steps drive every Lumora corner. Buttons use <code className="lm-code">md</code>,
          cards use <code className="lm-code">lg</code>, modals use{" "}
          <code className="lm-code">xl</code>.
        </DocsParagraph>
        <div className="grid gap-3 md:grid-cols-5">
          {radiusTokens.map((token) => (
            <div key={token} className="docs-feature-card grid gap-3 p-4 text-center">
              <div
                className="mx-auto h-20 w-full bg-[var(--lm-color-primary-soft)]"
                style={{
                  borderRadius: `var(--lm-${token})`,
                  border: "1px solid var(--lm-color-primary)"
                }}
                aria-hidden
              />
              <div className="grid gap-0.5">
                <strong className="text-sm">{token}</strong>
                <code className="lm-code text-xs">
                  {(lightTheme.tokens as Record<string, string>)[token]}
                </code>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="shadow" title="Shadow">
        <DocsParagraph>
          Layered shadows for depth. <code className="lm-code">shadow-glow</code> ties the focus
          ring to the active primary color.
        </DocsParagraph>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          {shadowTokens.map((token) => (
            <div key={token} className="docs-feature-card grid gap-3 p-4 text-center">
              <div
                className="mx-auto h-16 w-full rounded-lg bg-[var(--lm-color-surface)]"
                style={{ boxShadow: `var(--lm-${token})` }}
                aria-hidden
              />
              <strong className="text-sm">{token}</strong>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="motion" title="Motion">
        <DocsParagraph>
          Two easing curves and three durations cover every Lumora animation. Combine them with
          standard CSS — every component does.
        </DocsParagraph>
        <div className="docs-feature-card overflow-hidden">
          <table className="lm-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>CSS variable</th>
                <th>Value</th>
                <th>Used for</th>
              </tr>
            </thead>
            <tbody>
              {motionTokens.map((token) => (
                <tr key={token}>
                  <td>
                    <strong className="text-sm">{token}</strong>
                  </td>
                  <td>
                    <code className="lm-code">--lm-{token}</code>
                  </td>
                  <td>
                    <code className="lm-code text-xs">
                      {(lightTheme.tokens as Record<string, string>)[token]}
                    </code>
                  </td>
                  <td className="text-sm text-[var(--lm-color-muted)]">
                    {motionDescriptions[token]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DocsCallout tone="info" title="Reduced motion">
          All animations are wrapped in a{" "}
          <code className="lm-code">@media (prefers-reduced-motion: reduce)</code> rule that
          collapses durations to 0.01ms. Users who opt out get instant state changes.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="density" title="Density">
        <DocsParagraph>
          A single multiplier scales control padding and gaps. Default is{" "}
          <code className="lm-code">1</code>. Set <code className="lm-code">density: 0.88</code> in
          your theme for compact admin views, <code className="lm-code">1.14</code> for marketing.
        </DocsParagraph>
        <DocsCode
          filename="example.html"
          code={`<!-- Or per-region without changing the theme -->
<section class="lm-density-compact">…</section>
<section class="lm-density-comfortable">…</section>
<section class="lm-density-spacious">…</section>`}
          lang="html"
        />
      </DocsSection>
    </DocsLayout>
  );
}

const motionDescriptions: Record<string, string> = {
  "ease-out": "State changes (hover, active, opacity transitions).",
  "ease-spring": "Overlay enters (modals, popovers, dropdowns).",
  "duration-fast": "Hover states, tooltips, focus rings.",
  "duration-base": "Most state changes (buttons, inputs).",
  "duration-slow": "Modals, drawers, page-level animations."
};
