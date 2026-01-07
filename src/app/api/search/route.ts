import { getAllPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const posts = getAllPosts("en");
  
  const filteredPosts = posts.filter(post => {
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });

  return NextResponse.json(filteredPosts);
}
