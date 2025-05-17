"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { Provider } from "@supabase/supabase-js";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  });

  if (error) {
    return {
      status: error?.message,
      user: null,
    };
  } else if (data?.user?.identities?.length === 0) {
    return {
      status: "User with this email already exists!",
      user: null,
    };
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return {
      status: error?.message,
      user: null,
    };
  }

  // create a user instance in User table
  const { data: existingUser } = await supabase
    .from("User")
    .select("*")
    .eq("email", credentials?.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { error: insertUserError } = await supabase.from("User").insert({
      email: data?.user.email,
      username: data?.user?.user_metadata?.username,
    });

    if (insertUserError) {
      return {
        status: insertUserError?.message,
        user: null,
      };
    }
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function signOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      // Return error state that can be used by the client
      return { success: false, error: error.message };
    }

    // Successful sign-out
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    // Handle any unexpected errors
    console.error("Sign out error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during sign out. Please try again.",
    };
  }
}

// OAuth sign-in with Google or another OAuth
export async function signinWithOAuth(provider: Provider) {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect("/auth/error?message=Could not authenticate user");
  }

  if (data.url) {
    redirect(data.url);
  }

  revalidatePath("/", "layout");
}

export async function resetPassword(formData: FormData) {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/update-password`,
  });

  if (error) {
    return { status: error?.message };
  }

  // redirect("/update-password?success=true");
  return { status: "success" };
}

export async function updateUserPassword(formData: FormData) {
  const supabase = await createClient();
  // const { error: CodeError } = await supabase.auth.exchangeCodeForSession(code);

  // if (CodeError) {
  //   return { status: CodeError?.message };
  // }

  const { error } = await supabase.auth.updateUser({
    password: formData.get("password") as string,
  });

  if (error) {
    return { status: error?.message };
  }

  revalidatePath("/", "layout");

  return { status: "success" };
}
