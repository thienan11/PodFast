import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, FileText, Home, Podcast, Headphones } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center pt-24 sm:pt-12">
      <div className="mb-8 relative">
        <div className="absolute -top-6 -right-6">
          <div className="bg-pastel-purple/20 p-3 rounded-full">
            <Podcast className="h-6 w-6 text-pastel-purple animate-pulse" />
          </div>
        </div>
        <div className="bg-pastel-blue/10 p-8 rounded-full">
          <Headphones className="h-20 w-20 text-pastel-blue" />
        </div>
        <div className="absolute -bottom-4 -left-4">
          <div className="bg-pastel-pink/20 p-2 rounded-full">
            <FileText className="h-5 w-5 text-pastel-pink" />
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-medium mb-3 text-pastel-text">
        Page Not Found
      </h1>

      <p className="text-muted-foreground mb-2 max-w-md">
        {"Oops! Looks like this page doesn't exist."}
      </p>

      <p className="text-sm text-muted-foreground mb-8 max-w-md">
        {
          "The page you're looking for might have been moved, deleted, or never existed."
        }
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href="/" className="flex items-center gap-2 ">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Button asChild className="bg-primary hover:bg-primary/90 text-white">
          <Link href="/summarize" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Summarize a Podcast
          </Link>
        </Button>
      </div>
    </div>
  );
}
