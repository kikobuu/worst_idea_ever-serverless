import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/project";
import ProjectDetail from "./ProjectDetail";

export default async function ProjectPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} locale={locale} />;
}