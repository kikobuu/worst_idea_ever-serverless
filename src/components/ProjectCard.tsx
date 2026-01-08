import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download, ExternalLink, Lock, Unlock } from "lucide-react";

interface ProjectCardProps {
  project: {
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
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:border-primary transition-colors border-2 overflow-hidden">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {project.previewImage ? (
          <Image
            src={project.previewImage}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-sm">No Preview</div>
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {project.type}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-0">
        <div className="flex gap-2 w-full">
          {project.videoUrl && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                <Play className="h-4 w-4 mr-1" />
                Watch Demo
              </a>
            </Button>
          )}
          
          {project.allowDownloadDemo && (
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-1" />
              Download Demo
            </Button>
          )}
        </div>
        
        <div className="flex gap-2 w-full">
          <Button variant="default" size="sm" className="flex-1" asChild>
            <a href={`/projects/${project.slug}`}>
              <ExternalLink className="h-4 w-4 mr-1" />
              View Details
            </a>
          </Button>
          
          {project.allowRequestProject ? (
            <Button variant="secondary" size="sm" className="flex-1">
              <Unlock className="h-4 w-4 mr-1" />
              Request Project
            </Button>
          ) : (
            <Button variant="secondary" size="sm" className="flex-1" disabled>
              <Lock className="h-4 w-4 mr-1" />
              Private
            </Button>
          )}
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground mt-2 pt-2 border-t">
          <span>Demo: {project.demoLicense}</span>
          <span>Project: {project.projectLicense}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
