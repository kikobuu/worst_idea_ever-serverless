import { getAllProjects } from "@/lib/project";
import AnimatedProjectsContent from "./AnimatedProjectsContent";

export default async function Projects({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const projects = getAllProjects(locale);

  return (
    <AnimatedProjectsContent projects={projects} />
  );
}
