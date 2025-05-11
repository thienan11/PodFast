"use client";
import React, { useState } from "react";
import { LogOut, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { signOut } from "@/app/(auth)/actions";
import { toast } from "sonner";

export default function UserNav({ user }: { user: User | null }) {
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
    <div className="flex items-center space-x-4">
      {!user ? (
        <div className="m-0 inline-flex rounded-md border p-0">
          <Link href="/signin">
            <Button
              variant="ghost"
              className="h-8 rounded-r-none px-3 cursor-pointer text-primary-foreground"
            >
              Sign in
            </Button>
          </Link>
          <div className="w-[1px] self-stretch bg-gray-200 dark:bg-gray-700" />
          <Link href="/signup">
            <Button
              variant="ghost"
              className="h-8 rounded-l-none border-0 px-3 cursor-pointer text-primary-foreground"
            >
              Sign up
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer border rounded-md bg-muted">
                <AvatarImage
                  src={user?.user_metadata.avatar_url}
                  alt={user?.user_metadata.username || "User avatar"}
                />
                <AvatarFallback className="text-xs font-medium">
                  {user?.user_metadata.username?.[0].toUpperCase() ||
                    user?.email?.[0].toUpperCase() ||
                    "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border border-border/50 bg-background p-2 space-y-1"
              align="center"
            >
              <DropdownMenuItem
                asChild
                className="flex cursor-pointer items-center focus:bg-secondary-300/10"
              >
                <Button
                  asChild
                  variant="secondary"
                  className="w-full justify-start text-left"
                >
                  <Link href="/dashboard">
                    <Cog className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="flex cursor-pointer items-center focus:bg-secondary-300/10"
                onSelect={(e) => {
                  // Prevent the dropdown from closing automatically
                  e.preventDefault();
                }}
              >
                <Button
                  onClick={handleSignOut}
                  variant="secondary"
                  className="w-full justify-start text-left"
                  disabled={isSigningOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
