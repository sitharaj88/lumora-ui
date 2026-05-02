import Link from "next/link";
import { ComplianceBadge } from "../components/atoms";
import { featureBlocks } from "../data/features";

export function FeaturesPage() {
  return (
    <div className="grid gap-16">
      {/* Header */}
      <header className="grid gap-3 text-center">
        <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
          Product · Features
        </p>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Everything you need to ship audit-ready software.
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--lm-color-muted)] md:text-lg">
          Lumora is the connective tissue between your stack and your auditor. Continuous evidence,
          policy-as-code, audit log API, and frameworks for every compliance regime.
        </p>
      </header>

      {/* Quick-jump nav */}
      <nav
        className="sticky -mt-6 z-10 rounded-xl border border-[var(--lm-color-border)] px-3 py-2"
        style={{
          background: "color-mix(in oklab, var(--lm-color-surface) 80%, transparent)",
          backdropFilter: "blur(12px)",
          top: "calc(4rem + 0.5rem)"
        }}
        aria-label="Feature sections"
      >
        <div className="flex flex-wrap items-center gap-1">
          {featureBlocks.map((f) => (
            <a key={f.id} href={`#${f.id}`} className="lm-btn lm-btn-ghost lm-btn-sm no-underline">
              {f.title.split(",")[0]}
            </a>
          ))}
        </div>
      </nav>

      {/* Feature blocks alternating */}
      {featureBlocks.map((block) => (
        <section
          key={block.id}
          id={block.id}
          className="grid scroll-mt-32 items-center gap-10 md:grid-cols-[1fr_1fr]"
        >
          <div className={`grid gap-4 ${block.reverse ? "md:order-2" : ""}`}>
            <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
              {block.eyebrow}
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              {block.title}
            </h2>
            <p className="text-[var(--lm-color-muted)] leading-relaxed">{block.body}</p>
            <ul className="grid gap-2.5">
              {block.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span
                    className="lm-badge lm-badge-success lm-badge-dot mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: b.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={block.reverse ? "md:order-1" : ""}>
            <FeatureVisual id={block.id} background={block.visual} />
          </div>
        </section>
      ))}

      {/* Integrations grid */}
      <section className="grid gap-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Integrations
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Connects to the stack you already run.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--lm-color-muted)]">
            40+ continuous integrations. AWS, GCP, Azure, Okta, GitHub, Datadog, Snowflake — all
            polled hourly with 24-hour coverage SLA.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[
            "AWS",
            "GCP",
            "Azure",
            "Okta",
            "Auth0",
            "GitHub",
            "GitLab",
            "Bitbucket",
            "Datadog",
            "Snowflake",
            "PagerDuty",
            "Slack",
            "Linear",
            "Jira",
            "Zendesk",
            "Vanta",
            "Drata",
            "1Password"
          ].map((name) => (
            <div
              key={name}
              className="lm-card lm-card-flat grid place-items-center px-3 py-5 text-center"
            >
              <strong className="text-sm">{name}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance regimes */}
      <section className="grid gap-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Frameworks
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Every framework your auditor reads.
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "SOC 2 Type II",
            "ISO 27001",
            "ISO 27017",
            "ISO 27018",
            "HIPAA",
            "HITRUST",
            "PCI DSS",
            "FedRAMP Moderate",
            "FedRAMP High",
            "GDPR",
            "CCPA",
            "NIST 800-53",
            "NIST CSF",
            "C5",
            "TISAX"
          ].map((c) => (
            <ComplianceBadge key={c} label={c} />
          ))}
        </div>
      </section>

      {/* Code sample */}
      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="grid gap-4">
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Policy as code
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Policies your engineers can review like any other PR.
          </h2>
          <p className="text-[var(--lm-color-muted)] leading-relaxed">
            Define controls as queries against your live evidence corpus. Diff them in pull
            requests. Test them against the last 12 months of events before you ship.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/preview/marketing/pricing" className="lm-btn lm-btn-primary lm-btn-sm">
              Start a free trial
            </Link>
            <Link
              href="/preview/marketing/blog/policy-as-code-anti-patterns"
              className="lm-btn lm-btn-outline lm-btn-sm"
            >
              Read the deep dive
            </Link>
          </div>
        </div>
        <div className="docs-code-window">
          <div className="docs-code-window-header">
            <span className="docs-code-window-dot" />
            <span className="docs-code-window-dot" />
            <span className="docs-code-window-dot" />
            <span className="ml-2 text-xs text-[var(--lm-color-muted)]">
              controls/access-review.ts
            </span>
          </div>
          <pre className="docs-code">
            <code>{`import { control, query } from '@lumora/policy';

export const accessReview = control({
  id: 'CC6.3',
  name: 'Quarterly access review',
  framework: ['SOC2', 'ISO27001'],
  evidence: query\`
    SELECT actor, target, granted_at
    FROM permission_grants
    WHERE granted_at > NOW() - INTERVAL '90 days'
  \`,
  passWhen: (rows) => rows.every(reviewed),
  cadence: 'hourly'
});`}</code>
          </pre>
        </div>
      </section>

      {/* CTA */}
      <section className="grid place-items-center">
        <div
          className="grid w-full max-w-3xl gap-4 rounded-2xl border border-[var(--lm-color-border)] px-6 py-10 text-center md:py-14"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 14%, var(--lm-color-surface)), color-mix(in oklab, var(--lm-color-accent) 10%, var(--lm-color-surface)))"
          }}
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            See every feature, in your stack.
          </h2>
          <p className="mx-auto max-w-xl text-[var(--lm-color-muted)]">
            14-day free trial. Connect AWS, GitHub, and your IdP. We'll show you your first evidence
            within 12 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/preview/marketing/pricing" className="lm-btn lm-btn-primary lm-btn-lg">
              Start free trial
            </Link>
            <Link href="/preview/marketing/pricing" className="lm-btn lm-btn-outline lm-btn-lg">
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureVisual({ id, background }: { id: string; background: string }) {
  // Each block gets a distinct illustration. We render a styled product
  // mock-up that subtly references the feature.
  return (
    <div
      className="lm-card overflow-hidden"
      style={{
        background,
        borderColor: "color-mix(in oklab, var(--lm-color-primary) 20%, var(--lm-color-border))",
        minHeight: "20rem",
        position: "relative"
      }}
    >
      <div
        className="absolute inset-0 grid place-items-center p-6"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in oklab, var(--lm-color-bg) 20%, transparent))"
        }}
      >
        <div
          className="lm-card lm-card-glass"
          style={{ width: "min(100%, 22rem)", backdropFilter: "blur(20px)" }}
        >
          <div className="lm-card-body grid gap-3 p-4">
            {id === "continuous-evidence" && (
              <>
                <span className="lm-badge lm-badge-success lm-badge-dot text-xs">
                  Live · 247 controls passing
                </span>
                <strong className="text-sm">SOC 2 Type II</strong>
                <p className="lm-hint text-xs">Hourly polling · last evidence 4 minutes ago</p>
                <div className="grid gap-1.5">
                  {[100, 92, 78, 64].map((pct, i) => (
                    <div key={i} className="grid gap-0.5">
                      <div
                        style={{
                          background: "var(--lm-color-surface-raised)",
                          borderRadius: "999px",
                          height: "0.25rem",
                          overflow: "hidden"
                        }}
                      >
                        <div
                          style={{
                            background: "var(--lm-color-success)",
                            height: "100%",
                            width: `${pct}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {id === "policy-as-code" && (
              <>
                <span className="lm-badge lm-badge-soft text-xs">PR #1842</span>
                <strong className="text-sm">controls/access-review.ts</strong>
                <div className="grid gap-1 font-mono text-[11px]">
                  <span className="text-[var(--lm-color-success)]">+ cadence: 'hourly'</span>
                  <span className="text-[var(--lm-color-danger)]">- cadence: 'daily'</span>
                  <span className="text-[var(--lm-color-muted)]">// 4,832 events tested</span>
                </div>
                <span className="lm-badge lm-badge-success lm-badge-dot text-xs">
                  Backwards-test passed
                </span>
              </>
            )}
            {id === "frameworks" && (
              <>
                <strong className="text-sm">Mapped controls</strong>
                <div className="grid grid-cols-3 gap-1.5">
                  {["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "GDPR", "FedRAMP"].map((f) => (
                    <span
                      key={f}
                      className="text-center text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: "var(--lm-color-primary-soft)",
                        color: "var(--lm-color-primary)",
                        borderRadius: "0.375rem",
                        padding: "0.4rem 0.25rem"
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className="lm-hint text-xs">132 controls reused across 6 frameworks</p>
              </>
            )}
            {id === "audit-log" && (
              <>
                <span className="lm-badge lm-badge-soft text-xs">Streaming</span>
                <strong className="text-sm">audit.lumora.cloud</strong>
                <div className="grid gap-1 font-mono text-[10px] text-[var(--lm-color-muted)]">
                  <span>09:14:22 saml.cert.rotate atlas-finance</span>
                  <span>09:13:08 members.invite northstar-health</span>
                  <span>09:11:42 plan.upgrade vector-labs</span>
                  <span>09:10:14 webhook.delete atlas-finance</span>
                </div>
                <span className="lm-badge lm-badge-success lm-badge-dot text-xs">
                  Signed · verified
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
