"use client";
import React, { useRef, useState } from "react";
import AuthButton from "./AuthButton";
// import { useRouter } from "next/navigation";
import { signUp } from "@/app/(auth)/actions";
import { toast } from "sonner";

export default function SignUp() {
  // const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signUp(formData);

    if (result.status === "success") {
      // Clear input fields after successful signup
      formRef.current?.reset();
      // Show success toast
      toast.info(
        "Account created successfully. Please check your email to verify your account!"
      );

      // router.push("/signin");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div className="px-5 sm:px-0">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-primary-foreground">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
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
          <AuthButton type="Sign up" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
