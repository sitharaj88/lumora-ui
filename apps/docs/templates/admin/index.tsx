import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";
import { NavIcon } from "../_shared/nav-icon";
import { accounts } from "./data/accounts";
import { AccountDetailPage as RealAccountDetail } from "./pages/account-detail";
import { AccountsPage as RealAccounts } from "./pages/accounts";
import { AuditPage as RealAudit } from "./pages/audit";
import { BillingPage as RealBilling } from "./pages/billing";
import { DashboardPage as RealDashboard } from "./pages/dashboard";
import { SettingsPage as RealSettings } from "./pages/settings";

const Dashboard = (_: TemplatePageProps) => <RealDashboard />;
const Accounts = (_: TemplatePageProps) => <RealAccounts />;
const AccountDetail = ({ segments }: TemplatePageProps) => (
  <RealAccountDetail accountId={segments[1] ?? "atlas-finance"} />
);
const Billing = (_: TemplatePageProps) => <RealBilling />;
const Audit = (_: TemplatePageProps) => <RealAudit />;
const Settings = (_: TemplatePageProps) => <RealSettings />;

export const adminTemplate: TemplateMeta = {
  slug: "admin",
  name: "Admin console",
  category: "Admin",
  status: "ready",
  description:
    "A 6-page SaaS admin: dashboard, accounts list & detail, billing, audit log, and settings.",
  productName: "Atlas Console",
  productInitial: "A",
  accent: "var(--lm-color-primary)",
  pages: [
    {
      path: "",
      label: "Dashboard",
      section: "Workspace",
      icon: <NavIcon name="dashboard" />,
      component: Dashboard
    },
    {
      path: "accounts",
      label: "Accounts",
      section: "Workspace",
      icon: <NavIcon name="accounts" />,
      badge: `${accounts.length}`,
      component: Accounts
    },
    // One hidden detail page per account so every link from the table works.
    ...accounts.map((a) => ({
      path: `accounts/${a.id}`,
      label: a.name,
      hideFromNav: true,
      component: AccountDetail
    })),
    {
      path: "billing",
      label: "Billing",
      section: "Workspace",
      icon: <NavIcon name="billing" />,
      component: Billing
    },
    {
      path: "audit",
      label: "Audit log",
      section: "System",
      icon: <NavIcon name="audit" />,
      component: Audit
    },
    {
      path: "settings",
      label: "Settings",
      section: "System",
      icon: <NavIcon name="settings" />,
      component: Settings
    }
  ]
};
