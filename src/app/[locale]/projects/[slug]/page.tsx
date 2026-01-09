import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectContentDocs } from "@/lib/project";
import ProjectDetailClient from "./ProjectDetailClient";

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

  const contentDocs = getProjectContentDocs(slug, locale);

  return <ProjectDetailClient project={project} locale={locale} contentDocs={contentDocs} />;
}
