import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Video, FileText, Sparkles, Link, TriangleAlert } from "lucide-react";

export default function SummarizePage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium tracking-tight mb-4 text-pastel-text text-center">
          Summarize a Podcast
        </h1>
        <p className="text-muted-foreground mb-8 text-center">
          Paste a YouTube link to get a quick summary of the content
        </p>

        <Card className="border shadow-sm mb-12">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <CardTitle className="text-pastel-text">
                  Enter YouTube URL
                </CardTitle>
                <CardDescription>
                  We will analyze the video and generate a concise summary
                </CardDescription>
              </div>

              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-pastel-purple/20 text-pastel-text hover:bg-pastel-purple/30 w-fit self-start md:self-auto">
                <Sparkles className="h-3 w-3 mr-1 text-pastel-purple" />
                <p className="text-pastel-purple">Gemini 1.5 Flash</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <form className="space-y-4">
              <div className="flex items-center space-x-2">
                <Link className="h-5 w-5 text-primary" />
                <Input
                  name="youtubeUrl"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  className="flex-1 border-muted"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white cursor-pointer"
              >
                Generate Summary
              </Button>
            </form>
            <p className="text-sm text-muted-foreground text-center mt-5 flex items-center justify-center">
              <TriangleAlert className="h-5 w-5 text-yellow-500 mr-2" />
              Not available yet. Stay tuned!
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="bg-pastel-blue/20 p-3 rounded-full mb-3">
              <Video className="h-5 w-5 text-pastel-blue" />
            </div>
            <h3 className="font-medium mb-1 text-sm">Paste YouTube Link</h3>
            <p className="text-xs text-muted-foreground">
              Enter the URL of any podcast or long-form video from YouTube
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-pastel-purple/20 p-3 rounded-full mb-3">
              <Sparkles className="h-5 w-5 text-pastel-purple" />
            </div>
            <h3 className="font-medium mb-1 text-sm">AI Processing</h3>
            <p className="text-xs text-muted-foreground">
              The AI model analyzes and extracts key points
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-pastel-pink/20 p-3 rounded-full mb-3">
              <FileText className="h-5 w-5 text-pastel-pink" />
            </div>
            <h3 className="font-medium mb-1 text-sm">Get Summary</h3>
            <p className="text-xs text-muted-foreground">
              Receive a concise, readable summary of the video
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
