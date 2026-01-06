import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CalendarIcon, TagIcon } from "lucide-react";

export default async function Blog({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts found.</p>
        ) : (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <Card className="hover:bg-muted/50 transition-colors border-2">
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
