"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

export function DetailToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => !!e);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top
          );
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="grid gap-2 text-sm">
      <span className="docs-section-eyebrow">On this page</span>
      <ul className="grid gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={
                active === item.id
                  ? "block rounded-md border-l-2 border-[var(--lm-color-primary)] bg-[color-mix(in_oklab,var(--lm-color-primary)_8%,transparent)] px-3 py-1.5 text-[var(--lm-color-text)]"
                  : "block rounded-md border-l-2 border-transparent px-3 py-1.5 text-[var(--lm-color-muted)] hover:text-[var(--lm-color-text)]"
              }
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
