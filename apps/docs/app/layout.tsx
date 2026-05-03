import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { lumoraThemes } from "@lumora-design/themes";
import { componentCatalog } from "../lib/catalog";
import { ResponsiveTableTagger } from "../components/responsive-table-tagger";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumora UI — A design system teams ship with",
  description: `Enterprise-grade Tailwind v4 design system. ${componentCatalog.length} semantic components, ${lumoraThemes.length} themes, motion + a11y verified in CI. Built for production apps.`
};

const themeBootstrap = `(function(){try{var t=localStorage.getItem('lumora-theme');var d=document.documentElement;if(t){d.setAttribute('data-lm-theme',t);}else if(!d.getAttribute('data-lm-theme')){d.setAttribute('data-lm-theme','lumora-dark');}}catch(e){document.documentElement.setAttribute('data-lm-theme','lumora-dark');}})();`;

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
        <ResponsiveTableTagger />
      </body>
    </html>
  );
}
