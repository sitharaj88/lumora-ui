export type Company = {
  id: string;
  name: string;
  initials: string;
  bg: string;
  industry: string;
  size: "Startup" | "Mid-market" | "Enterprise";
  region: string;
  domain: string;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const companies: Company[] = [
  {
    id: "atlas",
    name: "Atlas Finance",
    initials: "AF",
    bg: grad("primary", "accent"),
    industry: "Fintech",
    size: "Enterprise",
    region: "us-east",
    domain: "atlas.example"
  },
  {
    id: "northstar",
    name: "Northstar Health",
    initials: "NH",
    bg: grad("success", "info"),
    industry: "Healthcare",
    size: "Enterprise",
    region: "us-west",
    domain: "northstar.example"
  },
  {
    id: "helios",
    name: "Helios Logistics",
    initials: "HL",
    bg: grad("warning", "danger"),
    industry: "Logistics",
    size: "Mid-market",
    region: "eu-central",
    domain: "helios.example"
  },
  {
    id: "vector",
    name: "Vector Labs",
    initials: "VL",
    bg: grad("accent", "info"),
    industry: "Research",
    size: "Startup",
    region: "us-east",
    domain: "vectorlabs.example"
  },
  {
    id: "borealis",
    name: "Borealis Media",
    initials: "BM",
    bg: grad("info", "primary"),
    industry: "Media",
    size: "Mid-market",
    region: "us-east",
    domain: "borealis.example"
  },
  {
    id: "ironclad",
    name: "Ironclad Defense",
    initials: "ID",
    bg: grad("danger", "warning"),
    industry: "Defense",
    size: "Enterprise",
    region: "us-east",
    domain: "ironclad.example"
  },
  {
    id: "polaris",
    name: "Polaris Consumer",
    initials: "PC",
    bg: grad("accent", "warning"),
    industry: "Retail",
    size: "Mid-market",
    region: "us-east",
    domain: "polaris.example"
  },
  {
    id: "zenith",
    name: "Zenith Cloud",
    initials: "ZC",
    bg: grad("info", "accent"),
    industry: "Infra",
    size: "Mid-market",
    region: "ap-southeast",
    domain: "zenith.example"
  },
  {
    id: "lumen",
    name: "Lumen Bio",
    initials: "LB",
    bg: grad("success", "primary"),
    industry: "Biotech",
    size: "Startup",
    region: "eu-west",
    domain: "lumen.example"
  },
  {
    id: "delta",
    name: "Delta Fintech",
    initials: "DF",
    bg: grad("primary", "success"),
    industry: "Fintech",
    size: "Enterprise",
    region: "eu-central",
    domain: "delta.example"
  }
];

export function getCompany(id: string) {
  return companies.find((c) => c.id === id);
}
