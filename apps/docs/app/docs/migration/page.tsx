import {
  DocsCallout,
  DocsCode,
  DocsLayout,
  DocsList,
  DocsParagraph,
  DocsSection
} from "../../../components/docs-layout";

export const metadata = {
  title: "Versioning & migration — Lumora UI"
};

const upgradeCmd = `pnpm up @lumora-design/core@latest @lumora-design/themes@latest \\
  @lumora-design/react@latest @lumora-design/vue@latest`;

const v01migration = `/* Before — 0.1 */
.lm-input { border: 1px solid var(--lm-color-border); }

/* After — 0.2 */
.lm-input { border: 1px solid var(--lm-color-border-strong); }

/* Why: 0.2 split border into two tiers — color-border for subtle dividers,
   color-border-strong for control outlines. Update theme overrides if you
   forked the input class. */`;

const toc = [
  { id: "policy", label: "Versioning policy" },
  { id: "upgrade", label: "Upgrading" },
  { id: "v0-2", label: "0.1 → 0.2 migration" },
  { id: "deprecation", label: "Deprecation policy" }
];

const releases = [
  {
    version: "0.2",
    date: "April 2026",
    tone: "primary",
    headline: "Polish + 18 new components",
    notes: [
      "18 new components: calendar, date picker, OTP, number input, combobox, carousel, split pane, hover card, context menu, toggle group, diff, sparkline, inbox, divider, chat, mention, rich-text toolbar, scroll area",
      "15 new themes: sunset, mint, berry, ocean, mocha, pastel (light + dark), carbon, solar, aurora",
      "Polish pass: gradient buttons, glass cards, spring-eased modals, shimmer skeletons, soft badges",
      "New tokens: surface-sunken, border-strong, primary-soft, overlay, focus-ring, shadow-xl, shadow-glow, motion tokens"
    ]
  },
  {
    version: "0.1",
    date: "February 2026",
    tone: "soft",
    headline: "Initial public beta",
    notes: [
      "50 component families covering buttons, forms, tables, app shell",
      "24 themes with WCAG AA contrast",
      "React + Vue beta adapters",
      "Tailwind v4 plugin"
    ]
  }
];

export default function MigrationPage() {
  return (
    <DocsLayout
      current="/docs/migration"
      eyebrow="Versioning"
      title="Versioning & migration"
      description="Lumora uses Changesets and semantic versioning. The lm-* class contract and theme tokens are public API — breaking changes only happen on majors."
      toc={toc}
      prev={{ href: "/docs/tokens", label: "Design tokens" }}
    >
      <DocsSection id="policy" title="Versioning policy">
        <DocsParagraph>
          Every package follows semver. We treat these as the public surface area:
        </DocsParagraph>
        <DocsList
          items={[
            <>
              <strong>CSS classes</strong>: every <code className="lm-code">lm-*</code> class
              shipped by the core plugin.
            </>,
            <>
              <strong>Theme tokens</strong>: the names and types in{" "}
              <code className="lm-code">requiredThemeTokens</code>.
            </>,
            <>
              <strong>Adapter props</strong>: typed React and Vue component props.
            </>,
            <>
              <strong>Plugin options</strong>: the API of{" "}
              <code className="lm-code">@plugin "@lumora-design/core"</code>.
            </>
          ]}
        />
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              label: "Patch",
              tone: "success",
              desc: "Bug fixes, docs updates, non-breaking style corrections."
            },
            {
              label: "Minor",
              tone: "primary",
              desc: "New components, new themes, additive props or classes."
            },
            {
              label: "Major",
              tone: "danger",
              desc: "Breaking class, token, or adapter changes — with migration notes."
            }
          ].map((r) => (
            <div className="lm-card" key={r.label}>
              <div className="lm-card-body grid gap-2">
                <span className={`lm-badge lm-badge-${r.tone} lm-badge-dot w-fit`}>{r.label}</span>
                <p className="text-sm text-[var(--lm-color-muted)]">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="upgrade" title="Upgrading">
        <DocsParagraph>
          Upgrade all Lumora packages together — they share the same class contract and adapter
          types track core releases.
        </DocsParagraph>
        <DocsCode filename="terminal" code={upgradeCmd} />
        <DocsCallout tone="info" title="Always pin same minor version">
          <code className="lm-code">@lumora-design/core</code>,{" "}
          <code className="lm-code">@lumora-design/themes</code>,{" "}
          <code className="lm-code">@lumora-design/react</code>, and{" "}
          <code className="lm-code">@lumora-design/vue</code> should match minors. Mixing 0.1 core
          with 0.2 react can produce missing classes.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="v0-2" title="0.1 → 0.2 migration">
        <DocsParagraph>
          0.2 is additive. There are no breaking class removals — the only change you may need is
          updating fork-overridden borders and shadows.
        </DocsParagraph>
        <DocsCode filename="diff" code={v01migration} lang="css" />
        <DocsParagraph>
          New tokens were added — your existing themes still work without changes because new tokens
          have sensible derived defaults via <code className="lm-code">color-mix</code>.
        </DocsParagraph>
        <h3 className="text-lg font-bold tracking-tight">Release log</h3>
        <div className="grid gap-4">
          {releases.map((release) => (
            <article key={release.version} className="lm-card">
              <div className="lm-card-header flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`lm-badge lm-badge-${release.tone}`}>v{release.version}</span>
                  <h4 className="text-lg font-bold tracking-tight">{release.headline}</h4>
                </div>
                <span className="text-xs text-[var(--lm-color-muted)]">{release.date}</span>
              </div>
              <div className="lm-card-body">
                <ul className="grid gap-2 text-sm text-[var(--lm-color-muted)]">
                  {release.notes.map((n) => (
                    <li className="flex gap-2" key={n}>
                      <span aria-hidden>·</span>
                      <span className="text-[var(--lm-color-text)]">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="deprecation" title="Deprecation policy">
        <DocsList
          items={[
            "Deprecated APIs are kept for at least one minor version after the deprecation announcement.",
            "Deprecation warnings appear in the dev-time TypeScript output and in the changelog.",
            "Major releases include a codemod where automation is feasible.",
            "We give a 4-week heads-up on majors via the GitHub release notes."
          ]}
        />
      </DocsSection>
    </DocsLayout>
  );
}
