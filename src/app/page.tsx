import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, Headphones } from "lucide-react";
import { formatDuration } from "@/lib/utils";
import posts from "@/data/posts.json";

// Get featured summaries
const featuredSummaries = posts.filter((summary) => summary.featured);
// Get non-featured summaries
const regularSummaries = posts.filter((summary) => !summary.featured);

export default function Home() {
  return (
    <div className="container mx-auto py-12">
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

      {/* Featured Summaries */}
      <section className="mb-16">
        <h2 className="text-xl font-medium mb-8 text-pastel-text">
          Featured Summaries
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {featuredSummaries.map((summary) => (
            <Link
              key={summary.id}
              href={`/summary/${summary.id}`}
              className="group transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 rounded-lg overflow-hidden border bg-background"
            >
              <div className={`h-2 w-full bg-pastel-orange`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs font-normal">
                    {summary.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDuration(summary.duration)}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                  {summary.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {summary.channel}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {summary.description}
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-xs cursor-pointer">
                    Read Summary
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Regular Summaries */}
      <section>
        <h2 className="text-xl font-medium mb-8 text-pastel-text">
          Recent Summaries
        </h2>
        <div className="space-y-4">
          {regularSummaries.map((summary) => (
            <Link
              key={summary.id}
              href={`/summary/${summary.id}`}
              className="transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 block border rounded-lg p-5 bg-background"
            >
              <div className="flex items-center justify-between mb-1">
                <Badge variant="outline" className="text-xs font-normal">
                  {summary.category}
                </Badge>
                <div className="flex items-center text-muted-foreground text-xs">
                  <Headphones className="h-3 w-3 mr-1" />
                  <span className="mr-2">{summary.channel}</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatDuration(summary.duration)}</span>
                </div>
              </div>
              <h3 className="text-lg font-medium mt-2 mb-1 hover:text-primary transition-colors">
                {summary.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {summary.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
