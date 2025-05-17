"use client";
import React, { useRef, useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { updateUserPassword } from "@/app/(auth)/actions";
import { toast } from "sonner";

export default function UpdatePassword() {
  // const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await updateUserPassword(
      formData
      // searchParams.get("code") as string
    );

    if (result.status === "success") {
      toast.success("Password updated successfully.");
      formRef.current?.reset(); // Clear input fields after successful signup
      router.push("/dashboard");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };
  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-200">
            New Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="Password"
            name="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>

        <div className="mt-4">
          <AuthButton type="Update Password" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
