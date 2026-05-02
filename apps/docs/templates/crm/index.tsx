import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";
import { NavIcon } from "../_shared/nav-icon";
import { contacts } from "./data/contacts";
import { ActivityPage as RealActivity } from "./pages/activity";
import { ContactDetailPage as RealContactDetail } from "./pages/contact-detail";
import { ContactsPage as RealContacts } from "./pages/contacts";
import { DealsPage as RealDeals } from "./pages/deals";
import { PipelinePage as RealPipeline } from "./pages/pipeline";
import { ReportsPage as RealReports } from "./pages/reports";

const Pipeline = (_: TemplatePageProps) => <RealPipeline />;
const Contacts = (_: TemplatePageProps) => <RealContacts />;
const ContactDetail = ({ segments }: TemplatePageProps) => (
  <RealContactDetail contactId={segments[1] ?? "maya-krishnan"} />
);
const Deals = (_: TemplatePageProps) => <RealDeals />;
const Activity = (_: TemplatePageProps) => <RealActivity />;
const Reports = (_: TemplatePageProps) => <RealReports />;

export const crmTemplate: TemplateMeta = {
  slug: "crm",
  name: "CRM workspace",
  category: "CRM",
  status: "ready",
  description:
    "A 6-page sales CRM: pipeline kanban, contacts list & detail, deals, activity, and reports.",
  productName: "Northwind CRM",
  productInitial: "N",
  accent: "var(--lm-color-success)",
  pages: [
    {
      path: "",
      label: "Pipeline",
      section: "Sales",
      icon: <NavIcon name="pipeline" />,
      component: Pipeline
    },
    {
      path: "contacts",
      label: "Contacts",
      section: "Sales",
      icon: <NavIcon name="contacts" />,
      badge: `${contacts.length}`,
      component: Contacts
    },
    // One hidden detail page per contact so every link works.
    ...contacts.map((c) => ({
      path: `contacts/${c.id}`,
      label: `${c.firstName} ${c.lastName}`,
      hideFromNav: true,
      component: ContactDetail
    })),
    {
      path: "deals",
      label: "Deals",
      section: "Sales",
      icon: <NavIcon name="deals" />,
      component: Deals
    },
    {
      path: "activity",
      label: "Activity",
      section: "Workspace",
      icon: <NavIcon name="activity" />,
      component: Activity
    },
    {
      path: "reports",
      label: "Reports",
      section: "Workspace",
      icon: <NavIcon name="reports" />,
      component: Reports
    }
  ]
};
