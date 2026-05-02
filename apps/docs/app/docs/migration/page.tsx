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

const toc = [
  { id: "policy", label: "Versioning policy" },
  { id: "upgrade", label: "Upgrading" },
  { id: "stability", label: "1.0 stability promise" },
  { id: "deprecation", label: "Deprecation policy" }
];

const releases = [
  {
    version: "1.0",
    date: "May 2026",
    tone: "primary",
    headline: "Initial public release",
    notes: [
      "65 components across 11 categories with the stable lm-* class contract",
      "39 themes (light / dark / graphite / aurora / nord / solarized and more), each WCAG-AA verified",
      "Stable React (@lumora-design/react) and Vue (@lumora-design/vue) adapters",
      "6 multi-page enterprise templates with 70+ preview routes",
      "Documentation site with searchable catalog, framework code tabs, CSS class tables, props tables, accessibility notes, and sticky TOC",
      "Visual regression suite + cross-template a11y audit (axe-core)"
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
          <code className="lm-code">@lumora-design/vue</code> should match minors. Mixing minor
          versions across these packages can produce missing classes.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="stability" title="1.0 stability promise">
        <DocsParagraph>
          1.0 freezes the public surface. The <code className="lm-code">lm-*</code> class contract,
          the theme token names, and the React + Vue adapter prop shapes will not break before 2.0.
          Additive changes (new components, new themes, new optional props) ship as minors.
        </DocsParagraph>
        <DocsList
          items={[
            <>
              <strong>Stable</strong>: 65 components, 39 themes, both adapters, all current props.
            </>,
            <>
              <strong>Additive only on minors</strong>: new components, new themes, new optional
              props, new utility classes.
            </>,
            <>
              <strong>Reserved for majors</strong>: renaming classes, renaming tokens, removing
              props, changing default behavior, raising minimum browser support.
            </>
          ]}
        />
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
