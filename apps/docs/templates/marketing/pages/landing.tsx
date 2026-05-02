import Link from "next/link";
import { AreaChart } from "../../../components/chart";
import { ComplianceBadge, PostCard } from "../components/atoms";
import { featureBlocks } from "../data/features";
import { posts } from "../data/posts";
import { customerLogos, heroStats, testimonials } from "../data/site";

export function LandingPage() {
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="grid gap-16">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-2xl border border-[var(--lm-color-border)] px-6 py-16 text-center md:px-12 md:py-24"
        style={{
          background:
            "radial-gradient(28rem 22rem at 50% 0%, color-mix(in oklab, var(--lm-color-primary) 24%, transparent), transparent 60%), radial-gradient(28rem 22rem at 80% 30%, color-mix(in oklab, var(--lm-color-accent) 22%, transparent), transparent 60%), radial-gradient(28rem 22rem at 20% 50%, color-mix(in oklab, var(--lm-color-info) 16%, transparent), transparent 60%), var(--lm-color-surface)"
        }}
      >
        <span className="lm-badge lm-badge-soft lm-badge-dot mb-4">
          Now in beta · Free for early teams
        </span>
        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
          The compliance platform
          <br />
          your auditors will love.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--lm-color-muted)] md:text-lg">
          Continuous SOC 2, ISO 27001, and HIPAA evidence. Wired into the tools your team already
          uses. No agents. No audit-of-audits.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/preview/marketing/pricing"
            className="lm-btn lm-btn-primary lm-btn-lg no-underline"
          >
            Start 14-day free trial
          </Link>
          <Link
            href="/preview/marketing/features"
            className="lm-btn lm-btn-outline lm-btn-lg no-underline"
          >
            Book a demo
          </Link>
        </div>
        <p className="mt-3 text-xs text-[var(--lm-color-muted)]">
          No credit card · 5-minute setup · Cancel anytime
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <ComplianceBadge label="SOC 2 Type II" />
          <ComplianceBadge label="ISO 27001" />
          <ComplianceBadge label="HIPAA-ready" />
          <ComplianceBadge label="GDPR" />
          <ComplianceBadge label="FedRAMP Moderate" />
        </div>

        {/* Hero product preview */}
        <div className="relative mx-auto mt-12 max-w-4xl text-left">
          <div className="lm-card lm-card-glass overflow-hidden">
            <div className="lm-card-body p-2 md:p-3">
              <div
                className="rounded-lg border border-[var(--lm-color-border)] p-4 md:p-6"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 6%, var(--lm-color-surface)), var(--lm-color-surface))"
                }}
              >
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="docs-code-window-dot" />
                      <span className="docs-code-window-dot" />
                      <span className="docs-code-window-dot" />
                      <span className="ml-2 text-xs text-[var(--lm-color-muted)]">
                        lumora.cloud · controls
                      </span>
                    </div>
                    <span className="lm-badge lm-badge-success lm-badge-dot text-xs">
                      247 controls passing · live
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { label: "Controls covered", value: "247", trend: "▲ 12 this week" },
                      { label: "Evidence items", value: "1,842", trend: "▲ 184 today" },
                      { label: "Compliance score", value: "98%", trend: "🛡 SOC 2 ready" }
                    ].map((s) => (
                      <div className="lm-stat" key={s.label}>
                        <span className="lm-stat-label">{s.label}</span>
                        <span className="lm-stat-value">{s.value}</span>
                        <span className="lm-stat-trend lm-stat-trend-up">{s.trend}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="rounded-md p-3"
                    style={{ background: "var(--lm-color-surface-sunken)" }}
                  >
                    <AreaChart
                      height={140}
                      showLegend={false}
                      showGrid={false}
                      series={[
                        {
                          label: "Controls",
                          color: "primary",
                          values: [
                            42, 48, 52, 56, 62, 68, 72, 78, 84, 92, 102, 118, 132, 148, 168, 184,
                            198, 214, 226, 238, 247
                          ]
                        }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer logo wall */}
      <section className="grid gap-4">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--lm-color-muted)]">
          Trusted by teams shipping to production
        </p>
        <div className="grid grid-cols-2 items-center gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-8">
          {customerLogos.map((c) => (
            <div
              key={c.name}
              className="text-center text-sm font-bold tracking-tight"
              style={{ color: "var(--lm-color-text)" }}
            >
              {c.name}
            </div>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section
        className="rounded-2xl border border-[var(--lm-color-border)] px-6 py-10"
        style={{ background: "var(--lm-color-surface-sunken)" }}
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold tracking-tight md:text-5xl">
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  {s.value}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--lm-color-muted)]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature bento */}
      <section className="grid gap-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Everything you need
          </p>
          <h2 className="mx-auto mt-2 max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Compliance, fully automated.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: "✦",
              title: "Continuous evidence",
              body: "Scans 40+ tools every hour and files findings to your auditor in one click."
            },
            {
              icon: "🛡",
              title: "Frameworks built-in",
              body: "SOC 2, ISO 27001, HIPAA, PCI DSS, GDPR — out of the box, mapped to your stack."
            },
            {
              icon: "≡",
              title: "Audit log API",
              body: "Stream every privileged action to your SIEM with immutable, queryable retention."
            },
            {
              icon: "🌐",
              title: "Vendor risk",
              body: "Auto-assess subprocessors. Renewal alerts before SOC 2 reports go stale."
            },
            {
              icon: "✺",
              title: "Policy generator",
              body: "AI-drafted policies grounded in your real config — not generic templates."
            },
            {
              icon: "⌘",
              title: "Slack-native",
              body: "Approvals, evidence requests, remediation — all in your existing channels."
            }
          ].map((f) => (
            <article key={f.title} className="lm-card">
              <div className="lm-card-body grid gap-3 p-6">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                  style={{
                    background: "var(--lm-color-primary-soft)",
                    color: "var(--lm-color-primary)"
                  }}
                  aria-hidden="true"
                >
                  {f.icon}
                </span>
                <h3 className="text-lg font-bold tracking-tight">{f.title}</h3>
                <p className="text-sm text-[var(--lm-color-muted)] leading-relaxed">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center">
          <Link href="/preview/marketing/features" className="lm-btn lm-btn-outline lm-btn-sm">
            See every feature →
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className="grid gap-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            What teams say
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">From the people doing it.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="lm-card"
              style={i === 1 ? { borderColor: "var(--lm-color-primary)" } : undefined}
            >
              <div className="lm-card-body grid gap-4 p-6">
                <div
                  role="img"
                  className="flex items-center gap-1 text-base"
                  style={{ color: "var(--lm-color-warning)" }}
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }, (_, j) => (
                    <span key={j} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-balance text-base font-medium leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <span
                    className="lm-avatar lm-avatar-sm"
                    style={{ background: t.authorBg }}
                    aria-hidden="true"
                  >
                    {t.authorInitials}
                  </span>
                  <div>
                    <strong className="text-sm">{t.authorName}</strong>
                    <p className="text-xs text-[var(--lm-color-muted)]">{t.authorRole}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Latest from blog */}
      <section className="grid gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
              From the blog
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Latest writing</h2>
          </div>
          <Link href="/preview/marketing/blog" className="lm-btn lm-btn-outline lm-btn-sm">
            All posts →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredPosts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="grid place-items-center">
        <div
          className="grid w-full max-w-3xl gap-4 rounded-2xl border border-[var(--lm-color-border)] px-6 py-10 text-center md:py-14"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 16%, var(--lm-color-surface)), color-mix(in oklab, var(--lm-color-accent) 12%, var(--lm-color-surface)))"
          }}
        >
          <h2 className="mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Get audit-ready in 8 days.
          </h2>
          <p className="mx-auto max-w-xl text-[var(--lm-color-muted)]">
            14-day free trial. No credit card. White-glove onboarding for Growth and Enterprise.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/preview/marketing/pricing" className="lm-btn lm-btn-primary lm-btn-lg">
              Start free trial
            </Link>
            <Link href="/preview/marketing/pricing" className="lm-btn lm-btn-outline lm-btn-lg">
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
