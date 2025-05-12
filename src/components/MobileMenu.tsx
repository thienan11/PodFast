"use client";
import { useState } from "react";
import Link from "next/link";
import { LogIn, Cog, LogOut, UserPlus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@/components/ui/icons";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/app/(auth)/actions";
import { toast } from "sonner";

export function MobileMenu({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      const result = await signOut();

      // If there's an error (signOut returns an object instead of redirecting)
      if (result && !result.success) {
        toast.error("Sign out failed", {
          description: result.error || "Failed to sign out. Please try again.",
        });
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Sign out error", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-md hover:bg-secondary-300/10 cursor-pointer"
          aria-label="Open menu"
        >
          <HamburgerMenuIcon className="h-6 w-6 text-primary-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[300px] flex-col justify-between sm:w-[400px]"
      >
        <div className="m-5">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-center text-primary-foreground">
              PodFast Menu
            </SheetTitle>
          </SheetHeader>

          {/* Mobile Menu Content */}
          <div className="flex flex-col items-center gap-2">
            {/* <UserNav user={user} /> */}
            <div className="mb-4 space-y-4">
              {user ? (
                <div>
                  {/* <div className="hidden items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.username || "User avatar"}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {user.user_metadata.username || user.email}
                    </span>
                  </div> */}
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-10"
                    >
                      <Cog className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="mt-4 w-full justify-start h-10"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </Button>
                </div>
              ) : (
                <div className="space-x-8">
                  <Link href="/signin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="mt-4 w-full justify-start"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="w-full space-y-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <div className="px-4 py-3 flex items-center">
                  <span className="text-md">Home</span>
                </div>
              </Link>

              <Link
                href="/summarize"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <div className="px-4 py-3 flex items-center">
                  <span className="text-md">Summarize</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
