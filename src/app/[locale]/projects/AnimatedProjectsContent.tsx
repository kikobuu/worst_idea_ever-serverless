"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  slug: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  demoLicense: string;
  projectLicense: string;
  videoUrl?: string;
  allowDownloadDemo: boolean;
  allowRequestProject: boolean;
  previewImage?: string;
}

interface AnimatedProjectsContentProps {
  projects: Project[];
}

export default function AnimatedProjectsContent({ projects }: AnimatedProjectsContentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <h1 
        className={cn(
          "text-3xl font-bold mb-8",
          isMounted 
            ? "animate-fadeInUp duration-500 ease-out" 
            : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: '100ms' }}
      >
        Projects
      </h1>
      
      {projects.length === 0 ? (
        <p 
          className={cn(
            "text-muted-foreground",
            isMounted 
              ? "animate-fadeInUp duration-500 ease-out" 
              : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: '200ms' }}
        >
          No projects found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={cn(
                isMounted 
                  ? "animate-fadeInUp duration-500 ease-out" 
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
