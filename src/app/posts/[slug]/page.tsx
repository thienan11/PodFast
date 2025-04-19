import { getSortedPosts, Post } from "@/lib/getPosts";
import React from "react";
import Markdown from "markdown-to-jsx";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { format, parse } from "date-fns";
import { Calendar, Clock, Tv } from "lucide-react";

type BlogPostParams = {
  params: Promise<{ slug: string }>;
};

// Data fetching function
async function getPostData(slug: string): Promise<Post | undefined> {
  const posts = getSortedPosts();
  return posts.find((post: Post) => post.slug === slug);
}

// Generate static paths with proper typing
export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  return {
    title: `${post?.title} | PodFast`,
    // description: post?.content.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) return notFound();

  const formatRawDate = (raw: string) => {
    try {
      const parsed = parse(raw, "yyyyMMdd", new Date());
      return format(parsed, "MMMM d, yyyy"); // e.g., "April 8, 2025"
    } catch {
      return "Invalid date";
    }
  };

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Post header */}
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {post.channel && (
              <span className="flex items-center gap-x-1">
                <Tv size={16} />
                <span>{post.channel}</span>
              </span>
            )}
            <span className="flex items-center gap-x-1">
              <Calendar size={16} />
              <span>{formatRawDate(post.published)}</span>
            </span>
            {post.duration && (
              <span className="flex items-center gap-x-1">
                <Clock size={16} />
                <span>{post.duration}</span>
              </span>
            )}
          </div>

          {/* Thumbnail if available */}
          {post.thumbnail && (
            <div className="mt-6 overflow-hidden rounded-lg">
              <Image
                src={post.thumbnail}
                alt={`Thumbnail for ${post.title}`}
                className="w-full h-auto object-cover"
                width={1280}
                height={720}
                priority
              />
            </div>
          )}
        </div>

        {/* Post content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-h1:text-2xl prose-h2:text-xl">
          <Markdown>{post.content}</Markdown>
        </article>

        {/* Related posts */}
        {/* <div className="mt-12 border-t border-gray-700 pt-8">
          <h2 className="text-xl font-bold text-white mb-4">Related Posts</h2>
          // TODO: Implement related posts
        </div> */}
      </div>
    </>
  );
}
