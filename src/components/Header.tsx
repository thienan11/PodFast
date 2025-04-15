import Link from "next/link";
import { WandSparkles } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center">
            <Image
              src="/podfast.png"
              width={60}
              height={60}
              alt="PodFast Logo"
            />
            <span className="font-medium text-xl">PodFast</span>
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            href="/summarize"
            className="inline-flex items-center gap-1 rounded-md border px-3 text-sm font-medium transition-colors hover:bg-muted h-9"
          >
            <WandSparkles className="h-4 w-4" />
            <span>Summarize</span>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
