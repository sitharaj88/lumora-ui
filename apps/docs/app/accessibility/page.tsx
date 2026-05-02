import { lumoraAccessibilityGuidelines, lumoraAccessibilityTarget } from "@lumora-ui/core";
import {
  DocsCallout,
  DocsLayout,
  DocsList,
  DocsParagraph,
  DocsSection
} from "../../components/docs-layout";

export const metadata = {
  title: "Accessibility — Lumora UI"
};

const toc = [
  { id: "promise", label: "The promise" },
  { id: "verified", label: "Verified in CI" },
  { id: "patterns", label: "Component patterns" },
  { id: "checklist", label: "Audit checklist" }
];

export default function AccessibilityPage() {
  return (
    <DocsLayout
      current="/accessibility"
      eyebrow={lumoraAccessibilityTarget.standard}
      title="Accessibility contract"
      description="Lumora's accessibility is part of the public API. Components ship keyboard states, ARIA semantics, focus rings, and AA-tested contrast — verified in CI on every release."
      toc={toc}
    >
      <DocsSection id="promise" title="The promise">
        <DocsParagraph>
          Every Lumora primitive is designed around five hard constraints. If a release would break
          any of them, we don't ship it.
        </DocsParagraph>
        <div className="grid gap-3 md:grid-cols-2">
          {lumoraAccessibilityTarget.includes.map((item, i) => (
            <div className="docs-feature-card grid gap-2 p-5" key={item}>
              <span className="docs-section-eyebrow">Promise {i + 1}</span>
              <strong className="text-base">{item}</strong>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="verified" title="Verified in CI">
        <DocsParagraph>
          Two automated suites run on every commit and block merges if they fail.
        </DocsParagraph>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="docs-feature-card grid gap-2 p-5">
            <span className="docs-section-eyebrow">Suite 1</span>
            <strong className="text-base">Theme contrast</strong>
            <p className="text-sm text-[var(--lm-color-muted)]">
              Iterates every theme and asserts WCAG AA contrast ratio (4.5:1) on 10 critical
              foreground/background pairs — surface/text, primary/primary-fg, every semantic pair.
            </p>
            <p className="text-xs text-[var(--lm-color-muted)]">
              <code className="lm-code">tests/themes.test.ts</code>
            </p>
          </div>
          <div className="docs-feature-card grid gap-2 p-5">
            <span className="docs-section-eyebrow">Suite 2</span>
            <strong className="text-base">Component contracts</strong>
            <p className="text-sm text-[var(--lm-color-muted)]">
              Asserts that every documented selector, ARIA-state class, and component contract
              survives a release. Snapshots primary controls so styling regressions show up as
              diffs.
            </p>
            <p className="text-xs text-[var(--lm-color-muted)]">
              <code className="lm-code">tests/core.test.ts</code>
            </p>
          </div>
        </div>
        <DocsCallout tone="success" title="Run it yourself">
          Clone the repo and run <code className="lm-code">pnpm test</code> — both suites finish in
          under 2 seconds. Use them to validate custom themes too.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="patterns" title="Component patterns">
        <DocsParagraph>
          Each component below ships specific keyboard, ARIA, and focus contracts. Treat this as the
          audit reference for your screen-reader and keyboard testing.
        </DocsParagraph>
        <div className="grid gap-4">
          {lumoraAccessibilityGuidelines.map((guideline) => (
            <article className="docs-feature-card overflow-hidden" key={guideline.component}>
              <div className="border-b border-[var(--lm-color-border)] bg-[var(--lm-color-surface-raised)] px-5 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold tracking-tight">{guideline.component}</h3>
                    <span className="lm-badge lm-badge-soft text-xs">role={guideline.role}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {guideline.wcag.map((criterion) => (
                      <span className="lm-badge lm-badge-outline text-xs" key={criterion}>
                        {criterion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-4 p-5 lg:grid-cols-3">
                <div className="grid content-start gap-2">
                  <span className="docs-section-eyebrow">Required ARIA</span>
                  <ul className="grid gap-1.5 text-sm">
                    {guideline.requiredAttributes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          className="lm-badge lm-badge-success lm-badge-dot mt-1 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <code className="lm-code text-xs">{item}</code>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid content-start gap-2">
                  <span className="docs-section-eyebrow">Keyboard</span>
                  <ul className="grid gap-1.5 text-sm">
                    {guideline.keyboard.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="lm-kbd text-[10px]">↹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid content-start gap-2">
                  <span className="docs-section-eyebrow">Focus & notes</span>
                  <p className="text-sm text-[var(--lm-color-muted)]">{guideline.focus}</p>
                  <p className="text-sm text-[var(--lm-color-muted)]">{guideline.notes}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="checklist" title="Audit checklist">
        <DocsParagraph>
          Run through this list when shipping a feature built on Lumora. Most items are already
          handled by the components — this is the residual surface area in your application code.
        </DocsParagraph>
        <DocsList
          items={[
            "Every interactive element receives keyboard focus and shows the Lumora focus ring.",
            "All form inputs have associated <label> elements (or aria-label).",
            "Hint text and error messages are linked via aria-describedby.",
            "Toast and live-update regions wrap content in role='status' or aria-live='polite'.",
            "Modals and drawers trap focus and restore it to the trigger on close.",
            "Color is never the only signal for state — pair with text or icon.",
            "Skip-link is the first focusable element on every page.",
            "Animations honor prefers-reduced-motion (Lumora handles this for shipped components).",
            "Heading order is not skipped — every page starts with a single <h1>."
          ]}
        />
      </DocsSection>
    </DocsLayout>
  );
}
