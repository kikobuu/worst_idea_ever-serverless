"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, UnderlinedTabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectItemDescription, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ProjectFloatingMenu from "@/components/ProjectFloatingMenu";
import ProjectMobileSheet from "@/components/ProjectMobileSheet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";
import Mermaid from "@/components/Mermaid";
import { isValidElement } from "react";

interface ProjectDetailProps {
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
    content?: string;
  };
  locale: string;
}

export default function ProjectDetail({ project, locale }: ProjectDetailProps) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeContentTab, setActiveContentTab] = useState("toc");

  const headings = project.content?.match(/^#{2,3} .+/gm)?.map(heading => {
    const level = heading.match(/^#+/)?.[0].length || 0;
    const text = heading.replace(/^#+ /, '').trim();
    const id = text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-\u4e00-\u9fa5]+/g, '');
    return { level, text, id };
  }) || [];

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 pb-24 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
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
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Content View</h4>
                  <Select value={activeContentTab} onValueChange={setActiveContentTab}>
                    <SelectTrigger className="w-full border border-border bg-background hover:bg-accent rounded-md shadow-sm transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary">
                      <SelectValue 
                        title={activeContentTab === "toc" ? "Contents" : "Analytics"} 
                        description={activeContentTab === "toc" ? "View and navigate through the document structure" : "Track and analyze document engagement metrics"}
                        placeholder="Select view" 
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border rounded-md shadow-md">
                      <SelectItem className="hover:bg-accent hover:text-accent-foreground transition-colors duration-150 rounded-sm" value="toc">
                        <div className="font-medium">Contents</div>
                        <SelectItemDescription>View and navigate through the document structure</SelectItemDescription>
                      </SelectItem>
                      <SelectItem className="hover:bg-accent hover:text-accent-foreground transition-colors duration-150 rounded-sm" value="analytics">
                        <div className="font-medium">Analytics</div>
                        <SelectItemDescription>Track and analyze document engagement metrics</SelectItemDescription>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {activeContentTab === "toc" && (
                  <nav className="flex flex-col gap-2 font-sans">
                    {headings.length === 0 && (
                      <p className="text-sm text-muted-foreground">No headings</p>
                    )}
                    {headings.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
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
                )}
                
                {activeContentTab === "analytics" && (
                  <p className="text-sm text-muted-foreground">Analytics data will be displayed here.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-sans">
              {project.title}
            </h1>
            <div className="flex items-center text-muted-foreground gap-4 text-sm font-sans">
              <span>{project.type}</span>
              <div className="flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-muted px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {project.content && (
            <article className="prose prose-slate dark:prose-invert max-w-none font-noto-sans">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeSlug]}
                components={{
                  pre: ({ children, ...props }) => {
                    if (
                      isValidElement(children) &&
                      (children.props as any).className?.includes('language-mermaid')
                    ) {
                      return <>{children}</>;
                    }
                    return <pre {...props}>{children}</pre>;
                  },
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    if (match && match[1] === 'mermaid') {
                      return (
                        <Mermaid chart={String(children).replace(/\n$/, '')} />
                      );
                    }
                    return <code {...props} className={className}>{children}</code>;
                  }
                }}
              >
                {project.content}
              </ReactMarkdown>
            </article>
          )}
        </div>
      </div>

      <div className="lg:hidden">
        <ProjectFloatingMenu
          onOpen={() => setMobileSheetOpen(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <ProjectMobileSheet
          open={mobileSheetOpen}
          onOpenChange={setMobileSheetOpen}
          project={project}
          headings={headings}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}