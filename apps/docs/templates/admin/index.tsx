import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";
import { accounts } from "./data/accounts";
import { AccountDetailPage as RealAccountDetail } from "./pages/account-detail";
import { AccountsPage as RealAccounts } from "./pages/accounts";
import { AuditPage as RealAudit } from "./pages/audit";
import { BillingPage as RealBilling } from "./pages/billing";
import { DashboardPage as RealDashboard } from "./pages/dashboard";
import { SettingsPage as RealSettings } from "./pages/settings";

const navIcon = (path: string) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
);

const icons = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  accounts:
    "M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 13a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8zM16 13a7.96 7.96 0 0 0-3.6.85A9.99 9.99 0 0 1 18 21h6a8 8 0 0 0-8-8z",
  billing: "M2 7h20v4H2zM2 13h20v6H2z",
  audit: "M5 3h11l5 5v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 0v6h6M8 13h8M8 17h6",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.18-1.62l2.12-1.65-2-3.46-2.5 1a7 7 0 0 0-2.81-1.63L13 2h-2l-.63 2.64A7 7 0 0 0 7.56 6.27l-2.5-1-2 3.46 2.12 1.65A7 7 0 0 0 5 12c0 .56.07 1.1.18 1.62L3.06 15.27l2 3.46 2.5-1a7 7 0 0 0 2.81 1.63L11 22h2l.63-2.64a7 7 0 0 0 2.81-1.63l2.5 1 2-3.46-2.12-1.65A7 7 0 0 0 19 12z"
};

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
      icon: navIcon(icons.dashboard),
      component: Dashboard
    },
    {
      path: "accounts",
      label: "Accounts",
      section: "Workspace",
      icon: navIcon(icons.accounts),
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
      icon: navIcon(icons.billing),
      component: Billing
    },
    {
      path: "audit",
      label: "Audit log",
      section: "System",
      icon: navIcon(icons.audit),
      component: Audit
    },
    {
      path: "settings",
      label: "Settings",
      section: "System",
      icon: navIcon(icons.settings),
      component: Settings
    }
  ]
};
