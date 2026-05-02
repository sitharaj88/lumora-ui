import Link from "next/link";
import { DocsFooter } from "../../components/footer";
import { DocsNav } from "../../components/docs-nav";
import { templates } from "../../lib/templates";
import { templateRegistry } from "../../templates";

export const metadata = {
  title: "Templates — Lumora UI",
  description:
    "Multi-page Lumora UI templates: admin console, CRM, project board, storefront, marketing, analytics."
};

export default function TemplatesPage() {
  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pt-16 pb-10">
        <div className="grid max-w-3xl gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="lm-badge lm-badge-soft lm-badge-dot">New in v0.2</span>
            <span className="lm-badge lm-badge-outline">
              {templateRegistry.length} multi-page apps
            </span>
            <span className="lm-badge lm-badge-outline">
              {templateRegistry.reduce((s, t) => s + t.pages.length, 0)} pages total
            </span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            <span className="docs-headline">Multi-page templates.</span>{" "}
            <span className="docs-accent-text">Click through real flows.</span>
          </h1>
          <p className="text-lg leading-8 text-[var(--lm-color-muted)]">
            Each template is a multi-page mini-app — sidebar nav, breadcrumbs, sub-routes you can
            actually click through. Open one, navigate around, see what your product would feel like
            on Lumora.
          </p>
        </div>
      </section>

      {/* Multi-page templates (primary) */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <span className="docs-section-eyebrow">Live previews</span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              <span className="docs-headline">Multi-page apps</span>
            </h2>
          </div>
          <span className="text-xs text-[var(--lm-color-muted)]">
            {templateRegistry.length} templates ·{" "}
            {templateRegistry.reduce((s, t) => s + t.pages.filter((p) => !p.hideFromNav).length, 0)}{" "}
            navigable pages
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {templateRegistry.map((tpl) => {
            const pages = tpl.pages.filter((p) => !p.hideFromNav);
            return (
              <article
                key={tpl.slug}
                className="docs-feature-card relative flex flex-col overflow-hidden"
              >
                <Link
                  href={`/preview/${tpl.slug}`}
                  aria-label={`Open ${tpl.productName} preview`}
                  className="absolute inset-0 z-20 rounded-[inherit]"
                />

                {/* Visual top — gradient hero with the product brand */}
                <div
                  className="relative grid place-items-center overflow-hidden p-6"
                  style={{
                    minHeight: "10rem",
                    background: `radial-gradient(20rem 14rem at 50% 0%, color-mix(in oklab, ${
                      tpl.accent ?? "var(--lm-color-primary)"
                    } 30%, transparent), transparent 70%), color-mix(in oklab, ${
                      tpl.accent ?? "var(--lm-color-primary)"
                    } 8%, var(--lm-color-surface))`
                  }}
                >
                  <div className="grid place-items-center gap-2 text-center">
                    <span
                      className="lm-avatar lm-avatar-lg"
                      style={{
                        background: `linear-gradient(135deg, ${
                          tpl.accent ?? "var(--lm-color-primary)"
                        }, var(--lm-color-accent))`,
                        fontSize: "1.25rem"
                      }}
                      aria-hidden="true"
                    >
                      {tpl.productInitial}
                    </span>
                    <strong className="text-base text-[var(--lm-color-text)]">
                      {tpl.productName}
                    </strong>
                    <span className="lm-badge lm-badge-soft text-xs">
                      {pages.length} page{pages.length === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="docs-section-eyebrow">{tpl.category}</span>
                    {tpl.status === "preview" && (
                      <span className="lm-badge lm-badge-warning text-xs">Phase 1 stub</span>
                    )}
                    {tpl.status === "ready" && (
                      <span className="lm-badge lm-badge-success lm-badge-dot text-xs">Ready</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[var(--lm-color-text)]">{tpl.name}</h3>
                  <p className="line-clamp-2 text-sm text-[var(--lm-color-muted)]">
                    {tpl.description}
                  </p>

                  {/* Pages list */}
                  <ul className="grid gap-1 text-xs text-[var(--lm-color-muted)]">
                    {pages.slice(0, 4).map((p) => (
                      <li key={p.path} className="flex items-center gap-1.5">
                        <span aria-hidden>›</span>
                        <span>{p.label}</span>
                      </li>
                    ))}
                    {pages.length > 4 && <li className="text-[10px]">+ {pages.length - 4} more</li>}
                  </ul>

                  <div className="mt-2 flex items-center justify-between text-xs text-[var(--lm-color-muted)]">
                    <span>Open live preview</span>
                    <span aria-hidden>→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Single-page samples (secondary) */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <span className="docs-section-eyebrow">Single-page samples</span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              <span className="docs-headline">Standalone snapshots</span>
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-[var(--lm-color-muted)]">
              One-page composed views for spot inspiration. Multi-page versions of these will land
              in upcoming phases.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((tpl) => (
            <Link
              href={`/templates/${tpl.slug}`}
              key={tpl.slug}
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
                <span>View one-page sample</span>
                <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DocsFooter />
    </main>
  );
}
