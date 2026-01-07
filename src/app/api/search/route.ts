import { getAllPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const locale = searchParams.get("locale") || "en";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const posts = getAllPosts(locale);
  const queryLower = query.toLowerCase();

  const filteredPosts = posts.filter(post => {
    const title = post.title?.toLowerCase() || "";
    const description = post.description?.toLowerCase() || "";
    const tagsLower = (post.tags || []).map(tag => tag.toLowerCase());

    return (
      title.includes(queryLower) ||
      description.includes(queryLower) ||
      tagsLower.some(tag => tag.includes(queryLower))
    );
  });

  return NextResponse.json(filteredPosts);
}
