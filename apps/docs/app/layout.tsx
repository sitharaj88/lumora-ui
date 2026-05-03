import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { lumoraThemes } from "@lumora-design/themes";
import { componentCatalog } from "../lib/catalog";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumora UI — A design system teams ship with",
  description: `Enterprise-grade Tailwind v4 design system. ${componentCatalog.length} semantic components, ${lumoraThemes.length} themes, motion + a11y verified in CI. Built for production apps.`
};

const themeBootstrap = `(function(){try{var t=localStorage.getItem('lumora-theme');var d=document.documentElement;if(t){d.setAttribute('data-lm-theme',t);}else if(!d.getAttribute('data-lm-theme')){d.setAttribute('data-lm-theme','lumora-dark');}}catch(e){document.documentElement.setAttribute('data-lm-theme','lumora-dark');}})();`;

// On every navigation, find every card that wraps an lm-table and tag it
// as a focusable scrollable region. Required so axe-core's
// scrollable-region-focusable rule passes (scrollable areas must be
// reachable by keyboard so users without a mouse can still pan the table).
const tableA11yBootstrap = `(function(){function tag(){document.querySelectorAll('.lm-card,.docs-feature-card').forEach(function(c){if(c.querySelector('.lm-table')&&!c.hasAttribute('tabindex')){c.setAttribute('tabindex','0');c.setAttribute('role','region');if(!c.hasAttribute('aria-label')){var t=c.querySelector('.lm-card-title,h2,h3');c.setAttribute('aria-label',(t?t.textContent.trim()+' ':'')+'table — scrollable');}}});}if(document.readyState!=='loading'){tag();}else{document.addEventListener('DOMContentLoaded',tag);}var mo=new MutationObserver(tag);mo.observe(document.documentElement,{childList:true,subtree:true});})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <a className="docs-skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <script dangerouslySetInnerHTML={{ __html: tableA11yBootstrap }} />
      </body>
    </html>
  );
}
