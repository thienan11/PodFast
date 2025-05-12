"use client";

import React, { useTransition } from "react";
import { GoogleLogoColored } from "@/components/ui/icons";

interface OAuthButtonProps {
  provider: "Google";
  authType: "Sign in" | "Sign up";
}

const providerIcons: Record<string, React.ElementType> = {
  Google: GoogleLogoColored,
};

export default function OAuthButton({ provider, authType }: OAuthButtonProps) {
  const [isPending, startTransition] = useTransition();
  const Icon = providerIcons[provider];

  const handleLogin = () => {
    startTransition(async () => {});
    alert("OAuth not working yet!");
  };

  return (
    <div
      onClick={handleLogin}
      className="w-full gap-4 hover:cursor-pointer hover:bg-gray-600 mt-6 h-12 bg-gray-700 rounded-md p-4 flex justify-center items-center"
    >
      <Icon className="text-white mx-1 h-4 w-4 shrink-0" />
      <p className="text-white">
        {isPending ? "Redirecting..." : `${authType} with ${provider}`}
      </p>
    </div>
  );
}
