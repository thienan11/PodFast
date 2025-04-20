import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSortedPosts } from "@/lib/getPosts";
import PostsList from "@/components/PostsList";

export default function Home() {
  const posts = getSortedPosts();

  return (
    <div className="container py-12">
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-pastel-text">
            Key Insights from Podcasts—Fast
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Helping you make smarter choices with your time and attention.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Link href="/summarize">Summarize a Podcast</Link>
            </Button>
          </div>
        </div>
      </section>

      <PostsList posts={posts} />
    </div>
  );
}
