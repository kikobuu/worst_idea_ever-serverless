import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css"; 
import { Separator } from "@/components/ui/separator";
import Mermaid from "@/components/Mermaid";

export default async function BlogPost({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  // Simple extraction for TOC (H2 and H3)
  // Note: This simple ID generation might not perfectly match rehype-slug for complex characters
  const headings = post.content.match(/^#{2,3} .+/gm)?.map(heading => {
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
    <div className="container mx-auto py-8 px-4 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 font-sans">{post.title}</h1>
                <div className="flex items-center text-muted-foreground gap-4 text-sm font-sans">
                    <span>{post.date}</span>
                    <div className="flex gap-2">
                        {post.tags.map(tag => <span key={tag} className="bg-muted px-2 py-1 rounded">{tag}</span>)}
                    </div>
                </div>
            </div>
            
            <article className="prose prose-slate dark:prose-invert max-w-none font-serif">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeHighlight, rehypeSlug]}
                    components={{
                        code(props) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            if (match && match[1] === 'mermaid') {
                                return <Mermaid chart={String(children).replace(/\n$/, '')} />
                            }
                            return <code {...props} className={className}>{children}</code>
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </article>
        </div>

        {/* Sidebar TOC */}
        <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
                <h4 className="font-bold mb-4 font-sans">Table of Contents</h4>
                <Separator className="mb-4" />
                <nav className="flex flex-col gap-2 font-sans">
                    {headings.length === 0 && <p className="text-sm text-muted-foreground">No headings</p>}
                    {headings.map((heading, index) => (
                        <a 
                            key={index} 
                            href={`#${heading.id}`} 
                            className={`text-sm hover:text-primary transition-colors block py-1 border-l-2 border-transparent hover:border-primary pl-3 -ml-[2px] ${heading.level === 3 ? 'ml-4 text-muted-foreground' : 'text-foreground'}`}
                        >
                            {heading.text}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
      </div>
    </div>
  );
}
