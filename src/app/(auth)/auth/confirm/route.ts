import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";
  const redirectUrl = searchParams.get("redirectUrl");

  // Split the next parameter into path and query parts if it contains a question mark
  let nextPath = next;
  let nextQuery = "";
  if (next.includes("?")) {
    [nextPath, nextQuery] = next.split("?");
  }

  const redirectTo = request.nextUrl.clone();

  // If redirectUrl is present, decode it and use it as the redirection path
  if (redirectUrl) {
    const decodedRedirectUrl = decodeURIComponent(redirectUrl);
    redirectTo.href = decodedRedirectUrl;
  } else {
    redirectTo.pathname = nextPath; // Set just the path part (fallback only if redirectUrl is not present - next would be used)

    // Add query parameters if present
    if (nextQuery) {
      const nextQueryParams = new URLSearchParams(nextQuery);
      nextQueryParams.forEach((value, key) => {
        redirectTo.searchParams.append(key, value);
      });
    }
  }

  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("next");
  redirectTo.searchParams.delete("redirectUrl");

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // Only sign out for email verification, not for password reset
      if (type === "signup" || type === "email") {
        await supabase.auth.signOut();
      }
      // redirect user to specified redirect URL
      // redirect(next);
      return NextResponse.redirect(redirectTo);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/auth/error");
}
