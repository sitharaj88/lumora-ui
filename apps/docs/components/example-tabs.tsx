"use client";

import { useState } from "react";
import type { DocsExample } from "../lib/docs";
import { CodeCopy } from "./code-copy";

const tabs = ["html", "react", "vue"] as const;

export function ExampleTabs({ examples }: { examples: DocsExample }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("html");

  return (
    <div className="grid gap-4">
      <div className="lm-tabs" role="tablist" aria-label="Code examples">
        {tabs.map((tab) => (
          <button
            className={`lm-tab ${active === tab ? "lm-tab-active" : ""}`}
            type="button"
            role="tab"
            aria-selected={active === tab}
            key={tab}
            onClick={() => setActive(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      <CodeCopy code={examples[active]} />
    </div>
  );
}
