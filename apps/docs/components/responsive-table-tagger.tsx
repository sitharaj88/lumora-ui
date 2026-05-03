"use client";

import { useEffect } from "react";

// Find every card that wraps an lm-table and tag it as a focusable
// scrollable region. Required so axe-core's scrollable-region-focusable
// rule passes — scrollable areas must be reachable by keyboard. Runs in
// useEffect (post-hydration) so React's reconciler doesn't see a DOM
// mismatch between SSR'd HTML and the post-mutation tree.
export function ResponsiveTableTagger() {
  useEffect(() => {
    const tag = () => {
      const cards = document.querySelectorAll<HTMLElement>(".lm-card, .docs-feature-card");
      cards.forEach((card) => {
        if (!card.querySelector(".lm-table")) return;
        if (card.hasAttribute("tabindex")) return;
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "region");
        if (!card.hasAttribute("aria-label")) {
          const heading = card.querySelector<HTMLElement>(".lm-card-title, h2, h3");
          const prefix = heading?.textContent?.trim() ?? "";
          card.setAttribute(
            "aria-label",
            (prefix ? `${prefix} ` : "") + "table — scrollable"
          );
        }
      });
    };

    tag();
    // Re-tag on client navigations (App Router replaces subtrees).
    const observer = new MutationObserver(() => tag());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
