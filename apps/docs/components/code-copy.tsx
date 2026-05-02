"use client";

import { useState } from "react";

export function CodeCopy({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="docs-code-window">
      <div className="docs-code-window-header">
        <span className="docs-code-window-dot" aria-hidden="true" />
        <span className="docs-code-window-dot" aria-hidden="true" />
        <span className="docs-code-window-dot" aria-hidden="true" />
        <span className="ml-2 text-xs text-[var(--lm-color-muted)]">{filename ?? "snippet"}</span>
        <button
          className="lm-btn lm-btn-ghost lm-btn-sm ml-auto"
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
          }}
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="docs-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}
