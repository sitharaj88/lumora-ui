import {
  DocsCallout,
  DocsCode,
  DocsKeyTable,
  DocsLayout,
  DocsList,
  DocsParagraph,
  DocsSection
} from "../../../components/docs-layout";

export const metadata = {
  title: "Installation — Lumora UI"
};

const installPnpm = `# pnpm
pnpm add @lumora-ui/core tailwindcss

# npm
npm install @lumora-ui/core tailwindcss

# yarn
yarn add @lumora-ui/core tailwindcss

# bun
bun add @lumora-ui/core tailwindcss`;

const cssSnippet = `/* app/globals.css */
@import "tailwindcss";
@plugin "@lumora-ui/core";`;

const htmlVerify = `<button class="lm-btn lm-btn-primary lm-btn-md">It works</button>`;

const reactInstall = `pnpm add @lumora-ui/react`;

const reactExample = `// app/SaveButton.tsx
import { LumoraButton } from "@lumora-ui/react";

export function SaveButton() {
  return <LumoraButton variant="primary">Save changes</LumoraButton>;
}`;

const vueInstall = `pnpm add @lumora-ui/vue`;

const vueExample = `<!-- App.vue -->
<script setup lang="ts">
import { LumoraButton } from "@lumora-ui/vue";
</script>

<template>
  <LumoraButton variant="primary">Save changes</LumoraButton>
</template>`;

const themeAttr = `<!-- app/layout.html -->
<html data-lm-theme="lumora-dark">
  ...
</html>`;

const nextLayout = `// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-lm-theme="lumora-dark">
      <body>{children}</body>
    </html>
  );
}`;

const viteIndex = `<!-- index.html -->
<!DOCTYPE html>
<html lang="en" data-lm-theme="lumora-dark">
  <head>
    <link rel="stylesheet" href="/src/main.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`;

const toc = [
  { id: "requirements", label: "Requirements" },
  { id: "install", label: "Install the plugin" },
  { id: "wire-css", label: "Wire it into your CSS" },
  { id: "set-theme", label: "Set the theme" },
  { id: "verify", label: "Verify the install" },
  { id: "react", label: "React adapter" },
  { id: "vue", label: "Vue adapter" },
  { id: "frameworks", label: "Framework recipes" },
  { id: "troubleshooting", label: "Troubleshooting" }
];

export default function InstallationPage() {
  return (
    <DocsLayout
      current="/docs/installation"
      eyebrow="Get started · 5 min"
      title="Installation"
      description="Add Lumora to any Tailwind v4 project in two lines. Optional React and Vue packages are thin typed wrappers over the same lm-* class API."
      toc={toc}
      next={{ href: "/docs/theming", label: "Theming" }}
    >
      <DocsSection id="requirements" title="Requirements">
        <DocsParagraph>
          Lumora UI is a Tailwind CSS v4 plugin. It runs anywhere Tailwind v4 runs.
        </DocsParagraph>
        <DocsKeyTable
          rows={[
            { label: "Tailwind CSS", value: "v4.0 or later" },
            { label: "Node.js", value: "20.0 or later (for tooling)" },
            { label: "Frameworks", value: "Next.js · Vite · Astro · Remix · SvelteKit · Nuxt · Rails · Phoenix" },
            { label: "TypeScript", value: "Optional. Adapters ship full type definitions." }
          ]}
        />
      </DocsSection>

      <DocsSection id="install" title="Install the plugin">
        <DocsParagraph>
          Pick your package manager. The core plugin and Tailwind v4 are the only required
          dependencies — adapters are optional.
        </DocsParagraph>
        <DocsCode filename="terminal" code={installPnpm} />
      </DocsSection>

      <DocsSection id="wire-css" title="Wire it into your CSS">
        <DocsParagraph>
          Add the Tailwind import and the Lumora plugin to your top-level stylesheet. That's the
          whole installation.
        </DocsParagraph>
        <DocsCode filename="app/globals.css" code={cssSnippet} />
        <DocsCallout tone="info" title="Tailwind v4 is JIT-only">
          Lumora components are added via Tailwind's <code className="lm-code">addComponents</code>{" "}
          API. Tailwind v4 only emits CSS for classes you actually use, so unused components add
          zero bytes to your bundle.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="set-theme" title="Set the theme">
        <DocsParagraph>
          Lumora reads the active theme from a <code className="lm-code">data-lm-theme</code>{" "}
          attribute on any ancestor — usually <code className="lm-code">&lt;html&gt;</code>.
        </DocsParagraph>
        <DocsCode filename="layout.html" code={themeAttr} />
        <DocsParagraph>
          Without the attribute, Lumora falls back to <code className="lm-code">lumora-light</code>
          . See the <a className="text-[var(--lm-color-primary)] underline" href="/docs/theming">
            theming guide
          </a>{" "}
          for runtime switching, custom themes, and per-tenant theming.
        </DocsParagraph>
      </DocsSection>

      <DocsSection id="verify" title="Verify the install">
        <DocsParagraph>
          Drop this into any page. You should see a Lumora primary button with gradient and focus
          ring.
        </DocsParagraph>
        <DocsCode filename="app/page.html" code={htmlVerify} lang="html" />
        <DocsList
          items={[
            "Button has a primary background with a subtle vertical gradient.",
            "Hovering lifts it 1px and brightens the shadow.",
            "Focusing it (Tab key) shows a 3px focus ring.",
            "All animations respect prefers-reduced-motion."
          ]}
        />
      </DocsSection>

      <DocsSection id="react" title="React adapter">
        <DocsParagraph>
          Optional. The React package emits the same <code className="lm-code">lm-*</code> classes
          with typed props for variants, sizes, states, and compound structures.
        </DocsParagraph>
        <DocsCode filename="terminal" code={reactInstall} />
        <DocsCode filename="app/SaveButton.tsx" code={reactExample} />
        <DocsCallout tone="success" title="Tree-shakeable">
          Each component is a named export. Bundlers strip what you don't import — typical app
          ships under 4 KB of adapter code.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="vue" title="Vue adapter">
        <DocsParagraph>
          The Vue package mirrors the React API as Vue 3 components with slot-based composition.
        </DocsParagraph>
        <DocsCode filename="terminal" code={vueInstall} />
        <DocsCode filename="App.vue" code={vueExample} />
      </DocsSection>

      <DocsSection id="frameworks" title="Framework recipes">
        <DocsSection id="frameworks-next" level={3} title="Next.js (App Router)">
          <DocsParagraph>
            Add the data attribute to <code className="lm-code">&lt;html&gt;</code> in your root
            layout, then import your stylesheet in the same file.
          </DocsParagraph>
          <DocsCode filename="app/layout.tsx" code={nextLayout} />
        </DocsSection>
        <DocsSection id="frameworks-vite" level={3} title="Vite (any framework)">
          <DocsParagraph>
            Set the data attribute on the root HTML element and link your stylesheet from{" "}
            <code className="lm-code">main.css</code>.
          </DocsParagraph>
          <DocsCode filename="index.html" code={viteIndex} />
        </DocsSection>
        <DocsSection id="frameworks-other" level={3} title="Astro / Rails / Phoenix">
          <DocsParagraph>
            Same shape: include the Tailwind plugin in your CSS pipeline, set{" "}
            <code className="lm-code">data-lm-theme</code> on the root HTML element. Lumora has no
            framework-specific code.
          </DocsParagraph>
        </DocsSection>
      </DocsSection>

      <DocsSection id="troubleshooting" title="Troubleshooting">
        <DocsKeyTable
          rows={[
            {
              label: "Classes don't apply",
              value: (
                <>
                  Confirm{" "}
                  <code className="lm-code">@plugin "@lumora-ui/core"</code> appears after{" "}
                  <code className="lm-code">@import "tailwindcss"</code>. Restart the dev server
                  after editing CSS.
                </>
              )
            },
            {
              label: "Wrong colors",
              value: (
                <>
                  Check that <code className="lm-code">data-lm-theme</code> is set on{" "}
                  <code className="lm-code">&lt;html&gt;</code>. Inspect the element to confirm
                  the CSS variables resolved.
                </>
              )
            },
            {
              label: "FOUC on theme switch",
              value: (
                <>
                  Inject a small inline script in <code className="lm-code">&lt;head&gt;</code>{" "}
                  that reads <code className="lm-code">localStorage</code> and applies{" "}
                  <code className="lm-code">data-lm-theme</code> before paint. See the{" "}
                  <a className="text-[var(--lm-color-primary)] underline" href="/docs/theming">
                    theming guide
                  </a>
                  .
                </>
              )
            },
            {
              label: "Adapter classes mismatch",
              value: (
                <>
                  Pin <code className="lm-code">@lumora-ui/core</code> and{" "}
                  <code className="lm-code">@lumora-ui/react</code> to matching minor versions —
                  they share the class contract.
                </>
              )
            }
          ]}
        />
      </DocsSection>
    </DocsLayout>
  );
}
