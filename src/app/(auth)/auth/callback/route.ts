import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user data: ", userError.message);
        return NextResponse.redirect(`${origin}/auth/error`);
      }

      // Check if user exists in User table
      const { data: existingUser } = await supabase
        .from("User")
        .select("*")
        .eq("email", data?.user?.email)
        .limit(1)
        .single();

      if (!existingUser) {
        const username =
          data.user.user_metadata?.user_name ||
          data.user.user_metadata?.username ||
          data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          data.user.user_metadata?.email.split("@")[0]; // Fallback to email username
        // insert the new user into the User table
        const { error: dbError } = await supabase.from("User").insert({
          email: data?.user?.email,
          username: username,
        });

        if (dbError) {
          console.error("Error inserting user data: ", dbError.message);
          return NextResponse.redirect(`${origin}/auth/error`);
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
