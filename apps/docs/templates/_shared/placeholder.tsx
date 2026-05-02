import Link from "next/link";

export function TemplatePlaceholder({
  title,
  description,
  next
}: {
  title: string;
  description: string;
  next?: { href: string; label: string };
}) {
  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <h1 className="lm-page-title">{title}</h1>
          <p className="lm-page-description">{description}</p>
        </div>
        <span className="lm-badge lm-badge-soft lm-badge-dot">Phase 1 stub</span>
      </header>

      <div className="lm-card">
        <div className="lm-card-body grid gap-3 p-8">
          <strong className="text-sm">This page lights up in the next phase.</strong>
          <p className="lm-hint">
            Phase 1 wires the navigation. Phases 2+ replace each stub with real,
            production-grade content built from Lumora components.
          </p>
          {next && (
            <Link className="lm-btn lm-btn-primary lm-btn-sm w-fit" href={next.href}>
              {next.label} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
