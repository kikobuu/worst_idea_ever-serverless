"use client"

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CalendarIcon, TagIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  content: string;
}

interface AnimatedBlogContentProps {
  posts: BlogPost[];
}

export default function AnimatedBlogContent({ posts }: AnimatedBlogContentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <h1 
        className={cn(
          "text-3xl font-bold mb-8",
          isMounted 
            ? "animate-fadeInUp duration-500 ease-out" 
            : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: '100ms' }}
      >
        Blogs
      </h1>
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <p 
            className={cn(
              "text-muted-foreground",
              isMounted 
                ? "animate-fadeInUp duration-500 ease-out" 
                : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            No posts found.
          </p>
        ) : (
          posts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <Card 
                className={cn(
                  "hover:bg-muted/50 transition-colors border-2 group",
                  isMounted 
                    ? "animate-fadeInUp duration-500 ease-out" 
                    : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        {post.date}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <span className="text-primary text-sm font-medium group-hover:underline">
                    Read more &rarr;
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}