"use client";

import { useState } from "react";

export function CodeCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="grid gap-3">
      <pre className="docs-code">
        <code>{code}</code>
      </pre>
      <button
        className="lm-btn lm-btn-outline lm-btn-sm justify-self-start"
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
