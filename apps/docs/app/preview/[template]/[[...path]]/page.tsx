import { notFound } from "next/navigation";
import { TemplateShell } from "../../../../components/template-shell";
import { getTemplatePage, listAllTemplatePaths } from "../../../../lib/templates-registry";
// Side-effect import: registers every template into the registry.
import "../../../../templates";

export const dynamicParams = false;

export function generateStaticParams() {
  return listAllTemplatePaths().map((p) => ({
    template: p.template,
    path: p.path
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ template: string; path?: string[] }>;
}) {
  const { template: slug, path } = await params;
  const segments = path ?? [];
  const resolved = getTemplatePage(slug, segments);
  if (!resolved) return { title: "Template — Lumora UI" };
  return {
    title: `${resolved.page.label} · ${resolved.template.productName} — Lumora UI`,
    description: resolved.template.description
  };
}

export default async function PreviewPage({
  params
}: {
  params: Promise<{ template: string; path?: string[] }>;
}) {
  const { template: slug, path } = await params;
  const segments = path ?? [];
  const resolved = getTemplatePage(slug, segments);
  if (!resolved) notFound();

  const { template, page } = resolved;
  const PageComponent = page.component;

  return (
    <TemplateShell template={template} activePath={page.path}>
      <PageComponent segments={segments} />
    </TemplateShell>
  );
}
