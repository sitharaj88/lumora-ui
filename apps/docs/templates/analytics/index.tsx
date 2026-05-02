import { NavIcon } from "../_shared/nav-icon";
import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";
import { CohortsPage as RealCohorts } from "./pages/cohorts";
import { FunnelsPage as RealFunnels } from "./pages/funnels";
import { OverviewPage as RealOverview } from "./pages/overview";
import { ReportsPage as RealReports } from "./pages/reports";
import { SegmentsPage as RealSegments } from "./pages/segments";

const Overview = (_: TemplatePageProps) => <RealOverview />;
const Funnels = (_: TemplatePageProps) => <RealFunnels />;
const Cohorts = (_: TemplatePageProps) => <RealCohorts />;
const Segments = (_: TemplatePageProps) => <RealSegments />;
const Reports = (_: TemplatePageProps) => <RealReports />;

export const analyticsTemplate: TemplateMeta = {
  slug: "analytics",
  name: "Analytics",
  category: "Analytics",
  status: "ready",
  description:
    "A 5-page product analytics workspace: overview, funnels, cohorts, segments, reports.",
  productName: "Helio Insights",
  productInitial: "H",
  accent: "var(--lm-color-info)",
  pages: [
    {
      path: "",
      label: "Overview",
      section: "Insights",
      icon: <NavIcon name="overview" />,
      component: Overview
    },
    {
      path: "funnels",
      label: "Funnels",
      section: "Insights",
      icon: <NavIcon name="funnel" />,
      component: Funnels
    },
    {
      path: "cohorts",
      label: "Cohorts",
      section: "Insights",
      icon: <NavIcon name="cohort" />,
      component: Cohorts
    },
    {
      path: "segments",
      label: "Segments",
      section: "Tools",
      icon: <NavIcon name="segment" />,
      badge: "6",
      component: Segments
    },
    {
      path: "reports",
      label: "Reports",
      section: "Tools",
      icon: <NavIcon name="reports" />,
      badge: "6",
      component: Reports
    }
  ]
};
