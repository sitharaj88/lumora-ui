import Link from "next/link";
import { ComplianceBadge } from "../components/atoms";
import { pricingFeatureGroups, pricingTiers, tierPrice } from "../data/pricing";
import { faqEntries, testimonials } from "../data/site";

export function PricingPage() {
  const billing = "annual";

  return (
    <div className="grid gap-16">
      {/* Header */}
      <header className="grid gap-3 text-center">
        <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
          Plans · Billing
        </p>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Simple plans. Real value.
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--lm-color-muted)] md:text-lg">
          Start free. Upgrade when your auditor calls. Cancel anytime — your evidence is yours,
          exportable as JSON or Parquet.
        </p>

        <div className="mx-auto mt-4 lm-segmented" role="radiogroup" aria-label="Billing cycle">
          <button type="button" className="lm-segmented-item">
            Monthly
          </button>
          <button type="button" className="lm-segmented-item" aria-pressed="true">
            Annual <span className="ml-1 lm-badge lm-badge-success text-[10px]">−20%</span>
          </button>
        </div>
      </header>

      {/* Tiers */}
      <section className="grid gap-6 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <article
            key={tier.id}
            className={`lm-card ${tier.highlight ? "lm-card-gradient" : ""}`}
            style={
              tier.highlight
                ? {
                    borderColor: "var(--lm-color-primary)",
                    boxShadow: "var(--lm-shadow-glow)"
                  }
                : undefined
            }
          >
            <div className="lm-card-body grid gap-5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold tracking-tight">{tier.name}</h3>
                {tier.highlight && (
                  <span className="lm-badge lm-badge-primary text-xs">Recommended</span>
                )}
              </div>
              <p className="text-sm text-[var(--lm-color-muted)]">{tier.tagline}</p>
              <div className="grid gap-1">
                <span className="text-4xl font-bold tracking-tight tabular-nums">
                  {tierPrice(tier, billing)}
                </span>
                <span className="text-sm text-[var(--lm-color-muted)]">
                  {tier.id === "starter"
                    ? "Free forever"
                    : tier.id === "enterprise"
                      ? "Talk to us"
                      : "per workspace / month · billed annually"}
                </span>
              </div>
              <Link
                href="/preview/marketing"
                className={`lm-btn lm-btn-block lm-btn-${tier.ctaTone} no-underline text-center`}
              >
                {tier.ctaLabel}
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Compare */}
      <section className="grid gap-3">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">Compare</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight">
            Every feature, side by side.
          </h2>
        </div>

        <div className="lm-card overflow-hidden">
          <table className="lm-table">
            <thead>
              <tr>
                <th></th>
                {pricingTiers.map((tier) => (
                  <th key={tier.id} className="text-center">
                    <div className="grid gap-0.5">
                      <strong>{tier.name}</strong>
                      <span className="text-xs font-normal text-[var(--lm-color-muted)] tabular-nums">
                        {tierPrice(tier, billing)}
                        {tier.monthly > 0 && " / mo"}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingFeatureGroups().flatMap(([group, features], gi) => [
                <tr key={`group-${group}`} style={{ background: "var(--lm-color-surface-sunken)" }}>
                  <td colSpan={4} className="text-xs font-bold uppercase tracking-wider">
                    {group}
                  </td>
                </tr>,
                ...features.map((f, fi) => (
                  <tr key={`${gi}-${fi}-${f.label}`}>
                    <td>
                      <span className="text-sm">{f.label}</span>
                    </td>
                    {f.values.map((v, vi) => (
                      <td key={vi} className="text-center">
                        <FeatureValue value={v} />
                      </td>
                    ))}
                  </tr>
                ))
              ])}
              <tr>
                <td></td>
                {pricingTiers.map((tier) => (
                  <td key={`cta-${tier.id}`} className="text-center">
                    <Link
                      href="/preview/marketing"
                      className={`lm-btn lm-btn-${tier.ctaTone} lm-btn-sm no-underline`}
                    >
                      {tier.ctaLabel}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Compliance + trust */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="grid gap-4">
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">Trust</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight">
            We hold ourselves to the bar we sell.
          </h2>
          <p className="text-[var(--lm-color-muted)] leading-relaxed">
            Lumora is SOC 2 Type II audited and ISO 27001 certified. The reports are downloadable
            from your account once you sign. We sign DPAs and BAAs as standard.
          </p>
          <div className="flex flex-wrap gap-2">
            <ComplianceBadge label="SOC 2 Type II" />
            <ComplianceBadge label="ISO 27001" />
            <ComplianceBadge label="HIPAA" />
            <ComplianceBadge label="GDPR" />
            <ComplianceBadge label="DPA + BAA" />
          </div>
        </div>
        <article
          className="lm-card lm-card-flat"
          style={{
            background: "var(--lm-color-surface-sunken)",
            borderColor: "var(--lm-color-border)"
          }}
        >
          <div className="lm-card-body grid gap-4 p-6">
            <div
              className="flex items-center gap-1 text-base"
              style={{ color: "var(--lm-color-warning)" }}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} aria-hidden="true">
                  ★
                </span>
              ))}
            </div>
            <blockquote className="text-balance text-base font-medium leading-relaxed">
              "{testimonials[0].quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <span
                className="lm-avatar lm-avatar-sm"
                style={{ background: testimonials[0].authorBg }}
                aria-hidden="true"
              >
                {testimonials[0].authorInitials}
              </span>
              <div>
                <strong className="text-sm">{testimonials[0].authorName}</strong>
                <p className="text-xs text-[var(--lm-color-muted)]">{testimonials[0].authorRole}</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* FAQ */}
      <section className="grid gap-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">FAQ</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight">Common questions</h2>
        </div>
        <div className="mx-auto w-full max-w-3xl">
          <div className="lm-accordion">
            {faqEntries.map((entry, idx) => (
              <div className="lm-accordion-item" key={entry.question}>
                <button type="button" className="lm-accordion-trigger" aria-expanded={idx === 0}>
                  {entry.question}
                </button>
                <div className="lm-accordion-content" hidden={idx !== 0}>
                  {entry.answer}
                </div>
              </div>
            ))}
          </div>
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
            Pick a plan. Or pick our brain.
          </h2>
          <p className="mx-auto max-w-xl text-[var(--lm-color-muted)]">
            14-day free trial on Growth · custom MSAs for Enterprise · live demo same-day.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" className="lm-btn lm-btn-primary lm-btn-lg">
              Start free trial
            </button>
            <button type="button" className="lm-btn lm-btn-outline lm-btn-lg">
              Contact sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full"
        style={{
          background: "color-mix(in oklab, var(--lm-color-success) 16%, transparent)",
          color: "var(--lm-color-success)"
        }}
        aria-label="Included"
      >
        ✓
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="text-sm text-[var(--lm-color-muted)]" aria-label="Not included">
        —
      </span>
    );
  }
  return <span className="text-xs font-medium tabular-nums">{value}</span>;
}
