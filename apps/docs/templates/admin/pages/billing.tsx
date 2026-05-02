import { BarChart } from "../../../components/chart";
import { formatMoney, invoices, pricingTiers, usageTrend30d } from "../data/billing";

export function BillingPage() {
  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Workspace · Billing
          </p>
          <h1 className="lm-page-title mt-1">Billing & subscriptions</h1>
          <p className="lm-page-description">
            Manage your plan, payment method, usage, and invoices.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Download tax docs
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            Talk to sales
          </button>
        </div>
      </header>

      {/* Current plan */}
      <section
        className="lm-card lm-card-gradient"
        style={{
          borderColor: "var(--lm-color-primary)",
          boxShadow: "var(--lm-shadow-glow)"
        }}
      >
        <div className="lm-card-body grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <span className="lm-badge lm-badge-primary">Growth plan</span>
              <span className="text-sm text-[var(--lm-color-muted)]">
                Annual · renews Apr 2027
              </span>
            </div>
            <div className="text-4xl font-bold tracking-tight tabular-nums">
              $24,960{" "}
              <span className="text-base font-medium text-[var(--lm-color-muted)]">/ mo</span>
            </div>
            <p className="text-sm text-[var(--lm-color-muted)]">
              Includes 200 seats, 500K events/mo, 90-day audit retention, SSO + SCIM.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
                Manage seats
              </button>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                Change plan
              </button>
            </div>
          </div>
          <div className="grid gap-3">
            <UsageRow label="Seats" used={142} max={200} />
            <UsageRow label="Storage" used={184} max={250} unit="GB" />
            <UsageRow label="API calls" used={8.2} max={30} unit="M" decimals={1} />
            <UsageRow label="Audit retention" used={62} max={90} unit="days" />
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Compare plans</h2>
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item">
              Monthly
            </button>
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              Annual <span className="lm-badge lm-badge-success text-[10px] ml-1">−20%</span>
            </button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((plan) => (
            <article
              key={plan.name}
              className={`lm-card ${plan.highlight ? "lm-card-gradient" : ""}`}
              style={
                plan.highlight
                  ? {
                      borderColor: "var(--lm-color-primary)",
                      boxShadow: "var(--lm-shadow-glow)"
                    }
                  : undefined
              }
            >
              <div className="lm-card-body grid gap-5 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold tracking-tight">{plan.name}</h3>
                  {plan.current && (
                    <span className="lm-badge lm-badge-primary">Current</span>
                  )}
                </div>
                <div className="grid gap-1">
                  <span className="text-4xl font-bold tracking-tight tabular-nums">
                    {plan.price}
                  </span>
                  <span className="lm-hint text-sm">{plan.period}</span>
                </div>
                <ul className="grid gap-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span
                        className="lm-badge lm-badge-success lm-badge-dot mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`lm-btn lm-btn-block lm-btn-${
                    plan.highlight ? "primary" : "outline"
                  }`}
                  disabled={plan.current}
                >
                  {plan.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Usage chart + payment method */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="lm-card">
          <div className="lm-card-header flex items-center justify-between">
            <div>
              <h2 className="lm-card-title">Usage trend</h2>
              <p className="lm-card-subtitle">API calls per day · last 30 days</p>
            </div>
            <div className="lm-segmented">
              <button type="button" className="lm-segmented-item">
                7d
              </button>
              <button type="button" className="lm-segmented-item" aria-pressed="true">
                30d
              </button>
              <button type="button" className="lm-segmented-item">
                90d
              </button>
            </div>
          </div>
          <div className="lm-card-body">
            <BarChart
              values={usageTrend30d}
              labels={["1", "5", "10", "15", "20", "25", "30"]}
              color="primary"
              height={200}
            />
          </div>
        </section>

        <section className="lm-card">
          <div className="lm-card-header flex items-center justify-between">
            <h2 className="lm-card-title">Payment method</h2>
            <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
              Update
            </button>
          </div>
          <div className="lm-card-body grid gap-4">
            <div
              className="rounded-xl p-5 text-[var(--lm-color-primary-fg)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))"
              }}
            >
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    Visa
                  </span>
                  <span className="text-xs opacity-70">Exp 12/27</span>
                </div>
                <div className="font-mono text-lg tracking-widest">
                  •••• •••• •••• 4242
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>ATLAS FINANCE</span>
                  <span className="opacity-70">Default</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                + Add backup
              </button>
              <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                Remove
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Invoices */}
      <section className="lm-card">
        <div className="lm-card-header flex items-center justify-between">
          <div>
            <h2 className="lm-card-title">Invoices</h2>
            <p className="lm-card-subtitle">{invoices.length} months · all paid</p>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Export all
          </button>
        </div>
        <div className="lm-card-body">
          <table className="lm-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice</th>
                <th>Plan</th>
                <th className="text-right">Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((row) => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>
                    <code className="lm-code">{row.number}</code>
                  </td>
                  <td>
                    <span className="lm-badge lm-badge-soft text-xs">{row.plan}</span>
                  </td>
                  <td className="text-right tabular-nums font-medium">
                    {formatMoney(row.amount)}
                  </td>
                  <td>
                    <span className="lm-badge lm-badge-success lm-badge-dot text-xs">Paid</span>
                  </td>
                  <td>
                    <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function UsageRow({
  label,
  used,
  max,
  unit,
  decimals
}: {
  label: string;
  used: number;
  max: number;
  unit?: string;
  decimals?: number;
}) {
  const pct = (used / max) * 100;
  const tone = pct > 90 ? "danger" : pct > 70 ? "warning" : "primary";
  const fmt = (n: number) => (decimals ? n.toFixed(decimals) : n.toString());
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="tabular-nums text-[var(--lm-color-muted)]">
          {fmt(used)}
          {unit ? ` ${unit}` : ""} / {fmt(max)}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <div
        style={{
          background: "var(--lm-color-surface-raised)",
          borderRadius: "999px",
          height: "0.5rem",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            background: `linear-gradient(90deg, color-mix(in oklab, var(--lm-color-${tone}) 80%, white), var(--lm-color-${tone}))`,
            borderRadius: "999px",
            height: "100%",
            transition: "width 600ms ease",
            width: `${Math.min(pct, 100)}%`
          }}
        />
      </div>
    </div>
  );
}
