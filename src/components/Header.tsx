import Link from "next/link";
import { WandSparkles } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/ThemeToggle";
import UserNav from "@/components/UserNav";
import { createClient } from "@/utils/supabase/server";
import { MobileMenu } from "@/components/MobileMenu";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
            <span className="font-medium text-xl text-primary-foreground">
              PodFast
            </span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden flex gap-3">
          <ModeToggle />
          <MobileMenu user={user} />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6">
          <Link
            href="/summarize"
            className="inline-flex items-center gap-1 rounded-md border px-3 text-sm font-medium transition-colors hover:bg-muted h-9 text-primary-foreground"
          >
            <WandSparkles className="h-4 w-4" />
            <span>Summarize</span>
          </Link>
          <UserNav user={user} />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
