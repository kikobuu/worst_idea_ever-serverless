import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CalendarIcon, TagIcon } from "lucide-react";
import AnimatedBlogContent from "./AnimatedBlogContent";

export default async function Blog({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return (
    <AnimatedBlogContent posts={posts} />
  );
}
