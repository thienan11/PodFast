import React from "react";

export default function AuthButton({
  type,
  loading,
}: {
  type: "Sign In" | "Sign up" | "Reset Password" | "Update Password";
  loading: boolean;
}) {
  return (
    <button
      disabled={loading}
      type="submit"
      className={`${
        loading ? "bg-gray-600" : "bg-pastel-pink"
      } rounded-md w-full px-12 py-3 text-sm font-medium text-white cursor-pointer hover:bg-pastel-pink/80`}
    >
      {loading ? "Loading..." : type}
    </button>
  );
}
