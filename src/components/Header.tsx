import Link from "next/link";
import { FileText } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
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

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/summarize"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Summarize</span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
