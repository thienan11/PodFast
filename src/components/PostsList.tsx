"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Tv, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Post } from "@/lib/getPosts";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// Number of posts to load initially
const POSTS_PER_PAGE = 6;

export default function PostsList({ posts }: { posts: Post[] }) {
  const [visiblePosts, setVisiblePosts] = React.useState<Post[]>([]);
  const [postsToShow, setPostsToShow] = React.useState(POSTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);

  // Handle initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (posts.length > 0) {
        setVisiblePosts(posts.slice(0, postsToShow));
      }
      setInitialLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [posts, postsToShow]);

  // Handle loading more posts
  const handleLoadMore = () => {
    setIsLoadingMore(true);

    setTimeout(() => {
      const newPostsToShow = postsToShow + POSTS_PER_PAGE;
      setVisiblePosts(posts.slice(0, newPostsToShow));
      setPostsToShow(newPostsToShow);
      setIsLoadingMore(false);
    }, 800);
  };

  // // Handle infinite scroll
  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     // Check if user has scrolled to bottom
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - 500
  //     ) {
  //       // If we haven't shown all posts yet, load more
  //       if (postsToShow < posts.length) {
  //         setPostsToShow((prevPostsToShow) =>
  //           Math.min(prevPostsToShow + POSTS_PER_PAGE, posts.length)
  //         );
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [postsToShow, posts.length]);

  return (
    <section>
      <h2 className="text-xl font-medium mb-8 text-pastel-text">
        Featured Summaries
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Display actual loaded posts */}
        {initialLoading
          ? // Show initial loading skeletons
            Array(POSTS_PER_PAGE)
              .fill(0)
              .map((_, index) => (
                <PostSkeleton key={`initial-skeleton-${index}`} />
              ))
          : // Show loaded posts
            visiblePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 block border rounded-lg p-3 bg-background"
              >
                <div>
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      src={post.thumbnail || "https://placehold.co/500x500/jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
                    />
                    {post.duration && (
                      <span className="flex items-center gap-x-1 absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                        <Clock size={10} />
                        {post.duration}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-x-1">
                        <Tv size={16} />
                        <span>{post.channel}</span>
                      </span>
                      <span className="flex items-center gap-x-1">
                        <Calendar size={16} />
                        <span>{formatDate(post.published)}</span>
                      </span>
                    </div>
                    <h3 className="font-medium text-primary-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors pt-3">
                      <span>Read Post</span>
                      <ArrowRight className="h-3 w-3 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

        {/* Show loading skeletons for new posts being loaded */}
        {isLoadingMore &&
          Array(Math.min(POSTS_PER_PAGE, posts.length - visiblePosts.length))
            .fill(0)
            .map((_, index) => <PostSkeleton key={`more-skeleton-${index}`} />)}
      </div>

      {/* Loading indicator */}
      {!initialLoading && visiblePosts.length < posts.length && (
        <div className="flex justify-center mt-10">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </section>
  );
}

function PostSkeleton() {
  return (
    <div className="border rounded-lg p-3 bg-background">
      <div>
        <Skeleton className="w-full h-52" />
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3 mb-4" />
          <Skeleton className="h-4 w-20 mt-2" />
        </div>
      </div>
    </div>
  );
}
