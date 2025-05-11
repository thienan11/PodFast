"use client";
import React, { useEffect, useRef, useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/app/(auth)/actions";
import { toast } from "sonner";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Ref to track if the toast was already shown
  const hasShownToast = useRef(false);
  useEffect(() => {
    // Get the confirmed parameter from searchParams instead of window.location
    const isConfirmed = searchParams.get("confirmed") === "true";

    // Check that the toast hasn't been shown yet and that the parameter exists
    if (isConfirmed && !hasShownToast.current) {
      // Add a small timeout to ensure the UI is ready
      setTimeout(() => {
        toast.success("Your email has been confirmed!", {
          description: "You can now sign in 🎉",
        });
        hasShownToast.current = true; // Mark as shown
      }, 100);
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signIn(formData);

    if (result.status === "success") {
      router.push("/");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div className="px-5 sm:px-0">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-primary-foreground">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary-foreground">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <AuthButton type="Sign In" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
