"use client";

import { useState } from "react";
import { CodeCopy } from "./code-copy";

type Framework = "html" | "react" | "vue";

const labels: Record<Framework, string> = {
  html: "HTML / Tailwind",
  react: "React",
  vue: "Vue"
};

export function FrameworkTabs({
  html,
  react,
  vue,
  reactStatus,
  vueStatus
}: {
  html: string;
  react?: string;
  vue?: string;
  reactStatus?: "stable" | "preview" | "v0.3";
  vueStatus?: "stable" | "preview" | "v0.3";
}) {
  const [active, setActive] = useState<Framework>("html");
  const code = active === "html" ? html : active === "react" ? react : vue;
  const status =
    active === "react" ? reactStatus : active === "vue" ? vueStatus : "stable";

  return (
    <div className="grid gap-4">
      <div
        className="lm-tabs lm-tabs-pills"
        role="tablist"
        aria-label="Framework code samples"
        style={{ gap: "0.25rem" }}
      >
        {(["html", "react", "vue"] as const).map((tab) => {
          const tabStatus =
            tab === "react" ? reactStatus : tab === "vue" ? vueStatus : "stable";
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === tab}
              className="lm-tab"
              onClick={() => setActive(tab)}
            >
              {labels[tab]}
              {tabStatus === "v0.3" && (
                <span className="lm-badge lm-badge-soft text-[10px] ml-2">v0.3</span>
              )}
              {tabStatus === "preview" && (
                <span className="lm-badge lm-badge-warning text-[10px] ml-2">preview</span>
              )}
            </button>
          );
        })}
      </div>

      {code ? (
        <>
          {status === "v0.3" && (
            <div className="lm-alert lm-alert-info">
              <span aria-hidden>i</span>
              <div>
                <p className="lm-alert-title">Adapter ships in v0.3</p>
                <p className="lm-hint">
                  This is the planned API. The HTML class API is stable today — same lm-* contract.
                </p>
              </div>
            </div>
          )}
          <CodeCopy code={code} />
        </>
      ) : (
        <div className="lm-alert lm-alert-info">
          <span aria-hidden>i</span>
          <div>
            <p className="lm-alert-title">Coming in v0.3</p>
            <p className="lm-hint">
              The {active === "react" ? "React" : "Vue"} adapter for this component ships in v0.3.
              Use the HTML class API today — the contract won't change.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
