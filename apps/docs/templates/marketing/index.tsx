import { TemplatePlaceholder } from "../_shared/placeholder";
import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";

const Landing = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Landing"
    description="Hero with gradient mesh, social proof, feature bento, FAQ, CTA."
    next={{ href: "/preview/marketing/features", label: "Features deep-dive" }}
  />
);
const Features = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Features"
    description="Per-feature breakdowns with diagrams, code samples, and integrations."
    next={{ href: "/preview/marketing/pricing", label: "See pricing" }}
  />
);
const Pricing = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Pricing"
    description="3-tier pricing with feature comparison + annual/monthly toggle."
    next={{ href: "/preview/marketing/blog", label: "Read the blog" }}
  />
);
const Blog = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Blog"
    description="Post grid with categories, search, and author cards."
    next={{ href: "/preview/marketing/blog/why-compliance-platforms-fail", label: "Open featured post" }}
  />
);
const Post = ({ segments }: TemplatePageProps) => (
  <TemplatePlaceholder
    title={`Post · ${segments[1] ?? "post"}`}
    description="Article layout with TOC, prose, code samples, related posts."
  />
);

export const marketingTemplate: TemplateMeta = {
  slug: "marketing",
  name: "Marketing site",
  category: "Marketing",
  status: "preview",
  description: "A 5-page marketing site: landing, features, pricing, blog list, blog post.",
  productName: "Lumora Cloud",
  productInitial: "L",
  accent: "var(--lm-color-accent)",
  pages: [
    { path: "", label: "Landing", section: "Site", component: Landing },
    { path: "features", label: "Features", section: "Site", component: Features },
    { path: "pricing", label: "Pricing", section: "Site", component: Pricing },
    { path: "blog", label: "Blog", section: "Content", component: Blog },
    {
      path: "blog/why-compliance-platforms-fail",
      label: "Why compliance platforms fail",
      hideFromNav: true,
      component: Post
    }
  ]
};
