"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectMobileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    type: string;
    tags: string[];
    demoLicense: string;
    projectLicense: string;
    videoUrl?: string;
  };
  headings: Array<{ level: number; text: string; id: string }>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProjectMobileSheet({
  open,
  onOpenChange,
  project,
  headings,
  activeTab,
  setActiveTab,
}: ProjectMobileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <SheetTitle>Project Navigation</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h4 className="font-bold mb-2 font-sans">Project Type</h4>
              <p className="text-sm text-muted-foreground">{project.type}</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-bold mb-2 font-sans">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-muted px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-bold mb-2 font-sans">Licenses</h4>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  Demo: {project.demoLicense}
                </p>
                <p className="text-muted-foreground">
                  Project: {project.projectLicense}
                </p>
              </div>
            </div>

            {project.videoUrl && (
              <>
                <Separator />
                <div>
                  <h4 className="font-bold mb-2 font-sans">Video</h4>
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Watch Video
                  </a>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <h4 className="font-bold mb-4 font-sans">Table of Contents</h4>
            <Separator className="mb-4" />
            <nav className="flex flex-col gap-2 font-sans">
              {headings.length === 0 && (
                <p className="text-sm text-muted-foreground">No headings</p>
              )}
              {headings.map((heading, index) => (
                <a
                  key={index}
                  href={`#${heading.id}`}
                  onClick={() => onOpenChange(false)}
                  className={`text-sm hover:text-primary transition-colors block py-1 border-l-2 border-transparent hover:border-primary pl-3 -ml-[2px] ${
                    heading.level === 3
                      ? 'ml-4 text-muted-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}