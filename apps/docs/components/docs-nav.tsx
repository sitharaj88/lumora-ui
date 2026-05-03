import Link from "next/link";
import { guideCards } from "../lib/docs";
import { ThemeToggle } from "./theme-toggle";

export function DocsNav() {
  return (
    <nav className="lm-navbar">
      <div className="flex flex-1 items-center gap-6">
        <Link
          className="flex items-center gap-2 text-inherit no-underline"
          href="/"
          aria-label="Lumora UI home"
        >
          <span
            className="lm-avatar lm-avatar-sm"
            style={{
              background: "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))"
            }}
          >
            L
          </span>
          <strong className="text-base font-bold tracking-tight">Lumora UI</strong>
          <span className="lm-badge lm-badge-soft hidden sm:inline-flex">v1.0</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <Link className="lm-btn lm-btn-ghost lm-btn-sm" href="/components">
            Components
          </Link>
          <Link className="lm-btn lm-btn-ghost lm-btn-sm" href="/templates">
            Templates
          </Link>
          <Link className="lm-btn lm-btn-ghost lm-btn-sm" href="/api">
            API
          </Link>
          <Link className="lm-btn lm-btn-ghost lm-btn-sm" href="/docs/theming">
            Theming
          </Link>
          <details className="lm-dropdown">
            <summary className="lm-btn lm-btn-ghost lm-btn-sm list-none">Guides ↓</summary>
            <div className="lm-dropdown-menu">
              <span className="lm-dropdown-label">Get started</span>
              {guideCards.slice(0, 4).map((guide) => (
                <Link className="lm-dropdown-item" href={guide.href} key={guide.href}>
                  {guide.title}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
      <button
        type="button"
        className="lm-btn lm-btn-ghost lm-btn-sm hidden items-center gap-2 sm:inline-flex"
        aria-label="Search docs"
      >
        <span className="text-[var(--lm-color-muted)]">Search</span>
        <span className="lm-kbd">⌘</span>
        <span className="lm-kbd">K</span>
      </button>
      <ThemeToggle />
      <a
        className="lm-btn lm-btn-primary lm-btn-sm"
        href="https://github.com/sitharaj88/lumora-design"
        rel="noreferrer"
      >
        GitHub
      </a>
    </nav>
  );
}
