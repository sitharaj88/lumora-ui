import Link from "next/link";

const links = [
  {
    title: "Product",
    items: [
      { label: "Components", href: "/components" },
      { label: "Templates", href: "/templates" },
      { label: "API reference", href: "/api" },
      { label: "Theming", href: "/docs/theming" },
      { label: "Accessibility", href: "/accessibility" }
    ]
  },
  {
    title: "Docs",
    items: [
      { label: "Installation", href: "/docs/installation" },
      { label: "Tokens", href: "/docs/tokens" },
      { label: "Migration", href: "/docs/migration" }
    ]
  },
  {
    title: "Resources",
    items: [
      { label: "GitHub", href: "https://github.com/sitharaj88/lumora-ui" },
      { label: "Changelog", href: "/docs/migration" },
      { label: "Roadmap", href: "/docs/migration" }
    ]
  }
];

export function DocsFooter() {
  return (
    <footer className="relative mt-24 border-t border-[var(--lm-color-border)] bg-[color-mix(in_oklab,var(--lm-color-text)_2%,var(--lm-color-surface))]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="grid content-start gap-3">
          <Link
            className="flex items-center gap-2 text-inherit no-underline"
            href="/"
            aria-label="Lumora UI home"
          >
            <span
              className="lm-avatar lm-avatar-sm"
              style={{
                background:
                  "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))"
              }}
            >
              L
            </span>
            <strong className="text-base font-bold tracking-tight">Lumora UI</strong>
          </Link>
          <p className="max-w-xs text-sm text-[var(--lm-color-muted)]">
            The polished Tailwind component layer. Built for production apps that ship to real
            users.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="lm-badge lm-badge-soft">MIT licensed</span>
            <span className="lm-badge lm-badge-soft">v1.0</span>
          </div>
        </div>
        {links.map((column) => (
          <div className="grid content-start gap-3" key={column.title}>
            <span className="docs-section-eyebrow">{column.title}</span>
            <ul className="grid gap-2 text-sm">
              {column.items.map((item) => {
                const isExternal = item.href.startsWith("http");
                const className =
                  "text-[var(--lm-color-muted)] transition-colors hover:text-[var(--lm-color-text)]";
                return (
                  <li key={item.label}>
                    {isExternal ? (
                      <a className={className} href={item.href}>
                        {item.label}
                      </a>
                    ) : (
                      <Link className={className} href={item.href}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--lm-color-border)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 text-sm text-[var(--lm-color-muted)]">
          <span>© {new Date().getFullYear()} Lumora UI. Built with Tailwind v4.</span>
          <div className="flex items-center gap-3">
            <span>Made by craftspeople who ship.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
