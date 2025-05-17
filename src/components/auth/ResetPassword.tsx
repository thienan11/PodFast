"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { resetPassword } from "@/app/(auth)/actions";
import Link from "next/link";

export default function ResetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await resetPassword(formData);

    if (result.status === "success") {
      setSuccessMessage(
        "Password reset instructions have been sent to your email."
      );
    } else {
      setError(result.status);
    }

    setLoading(false);
  };
  return (
    <div>
      {successMessage.length > 0 ? (
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="mb-6 text-lg text-green-500">{successMessage}</p>
          <Link
            href="/"
            className="text-pastel-muted transition duration-150 ease-in-out hover:text-gray-200 hover:underline"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("resetPasswordSuccess");
              }
            }}
          >
            Return to Home
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
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

          <div className="mt-4">
            <AuthButton type="Reset Password" loading={loading} />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      )}
    </div>
  );
}
