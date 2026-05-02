import { NavIcon } from "../_shared/nav-icon";
import { TemplatePlaceholder } from "../_shared/placeholder";
import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";

const Overview = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Overview"
    description="Top-level KPIs, multi-series trend, and live event stream."
    next={{ href: "/preview/analytics/funnels", label: "Open funnels" }}
  />
);
const Funnels = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Funnels"
    description="Conversion funnel with drop-off, time-between-steps, segment compare."
    next={{ href: "/preview/analytics/cohorts", label: "Open cohorts" }}
  />
);
const Cohorts = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Cohorts"
    description="Retention heatmap by signup week with N8/N30/N90 callouts."
    next={{ href: "/preview/analytics/segments", label: "Open segments" }}
  />
);
const Segments = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Segments"
    description="Visual segment builder with property, behavior, and frequency clauses."
    next={{ href: "/preview/analytics/reports", label: "Open reports" }}
  />
);
const Reports = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Reports"
    description="Saved dashboards with scheduled email digests."
  />
);

export const analyticsTemplate: TemplateMeta = {
  slug: "analytics",
  name: "Analytics",
  category: "Analytics",
  status: "preview",
  description:
    "A 5-page product analytics workspace: overview, funnels, cohorts, segments, reports.",
  productName: "Helio Insights",
  productInitial: "H",
  accent: "var(--lm-color-info)",
  pages: [
    { path: "", label: "Overview", section: "Insights", icon: <NavIcon name="overview" />, component: Overview },
    { path: "funnels", label: "Funnels", section: "Insights", icon: <NavIcon name="funnel" />, component: Funnels },
    { path: "cohorts", label: "Cohorts", section: "Insights", icon: <NavIcon name="cohort" />, component: Cohorts },
    { path: "segments", label: "Segments", section: "Tools", icon: <NavIcon name="segment" />, component: Segments },
    { path: "reports", label: "Reports", section: "Tools", icon: <NavIcon name="reports" />, component: Reports }
  ]
};
