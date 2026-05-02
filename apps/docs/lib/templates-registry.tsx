import type { ComponentType, ReactNode } from "react";

export type TemplatePageMeta = {
  /** URL segment under /preview/<template>/. Use `""` for the home page. */
  path: string;
  /** Display label used in the template's sidebar nav. */
  label: string;
  /** Optional section grouping in the template sidebar. */
  section?: string;
  /** Optional inline icon shown beside the label. */
  icon?: ReactNode;
  /** Optional badge (e.g. "12") shown beside the label. */
  badge?: string;
  /** Optional hidden flag — page exists but doesn't render in nav. */
  hideFromNav?: boolean;
  /** The page component. Async/server-component allowed. */
  component: ComponentType<TemplatePageProps>;
};

export type TemplatePageProps = {
  /** Catch-all path segments after /preview/<template>/<page>. Empty for index pages. */
  segments: string[];
};

export type TemplateMeta = {
  slug: string;
  name: string;
  category: "Admin" | "CRM" | "Project" | "Commerce" | "Marketing" | "Analytics" | "Auth" | "Settings";
  status: "ready" | "preview" | "coming-soon";
  description: string;
  /** Brand color shown in the template chrome and gallery accent. */
  accent?: string;
  /** Display name shown in the template's topbar (e.g. "Atlas Console"). */
  productName: string;
  /** Compact 1-letter logo for the topbar avatar. */
  productInitial: string;
  /** Pages keyed by path. The page with `path: ""` is the home. */
  pages: TemplatePageMeta[];
};

/**
 * Registry of every multi-page template. Phase 1 ships placeholder pages so the
 * navigation works end-to-end; Phases 2+ replace each with real content.
 */
export const templateRegistry: TemplateMeta[] = [];

export function registerTemplate(meta: TemplateMeta) {
  if (templateRegistry.find((t) => t.slug === meta.slug)) {
    return;
  }
  templateRegistry.push(meta);
}

export function getTemplateMeta(slug: string) {
  return templateRegistry.find((t) => t.slug === slug);
}

export function getTemplatePage(slug: string, segments: string[]) {
  const template = getTemplateMeta(slug);
  if (!template) return null;
  const wanted = segments.join("/");
  const page = template.pages.find((p) => p.path === wanted);
  return page ? { template, page } : null;
}

export function listAllTemplatePaths() {
  return templateRegistry.flatMap((t) =>
    t.pages
      .filter((p) => !p.hideFromNav || p.path !== "")
      .map((p) => ({
        template: t.slug,
        path: p.path === "" ? [] : p.path.split("/")
      }))
  );
}
