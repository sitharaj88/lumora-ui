import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";
import { NavIcon } from "../_shared/nav-icon";
import { issues } from "./data/issues";
import { BacklogPage as RealBacklog } from "./pages/backlog";
import { BoardPage as RealBoard } from "./pages/board";
import { RoadmapPage as RealRoadmap } from "./pages/roadmap";
import { ProjectSettingsPage as RealSettings } from "./pages/settings";
import { SprintPage as RealSprint } from "./pages/sprint";

const Board = (_: TemplatePageProps) => <RealBoard />;
const Backlog = (_: TemplatePageProps) => <RealBacklog />;
const Roadmap = (_: TemplatePageProps) => <RealRoadmap />;
const Sprint = (_: TemplatePageProps) => <RealSprint />;
const Settings = (_: TemplatePageProps) => <RealSettings />;

const backlogCount = issues.filter((i) => i.status === "backlog").length;

export const projectTemplate: TemplateMeta = {
  slug: "project",
  name: "Project board",
  category: "Project",
  status: "ready",
  description: "A 5-page Linear-style project tracker: board, backlog, roadmap, sprint, settings.",
  productName: "Vector Tasks",
  productInitial: "V",
  accent: "var(--lm-color-accent)",
  pages: [
    {
      path: "",
      label: "Board",
      section: "Project",
      icon: <NavIcon name="board" />,
      component: Board
    },
    {
      path: "backlog",
      label: "Backlog",
      section: "Project",
      icon: <NavIcon name="backlog" />,
      badge: `${backlogCount}`,
      component: Backlog
    },
    {
      path: "roadmap",
      label: "Roadmap",
      section: "Planning",
      icon: <NavIcon name="roadmap" />,
      component: Roadmap
    },
    {
      path: "sprint",
      label: "Sprint 24",
      section: "Planning",
      icon: <NavIcon name="sprint" />,
      component: Sprint
    },
    {
      path: "settings",
      label: "Settings",
      section: "Workspace",
      icon: <NavIcon name="settings" />,
      component: Settings
    }
  ]
};
