import UpdatePassword from "@/components/auth/UpdatePassword";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UpdatePasswordPage() {
  const supabase = await createClient();

  // Only available for logged in users (or with provided token)
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/signin");
  }

  // Redirect to the home page if the user is not using email provider
  if (data.user.app_metadata.provider !== "email") {
    redirect("/");
  }

  return (
    <>
      <div className="w-full flex mt-20 justify-center">
        <section className="flex flex-col w-[400px] px-5 sm:px-0">
          <h1 className="text-3xl w-full text-center font-bold mb-6">
            Update Password
          </h1>
          <UpdatePassword />
        </section>
      </div>
    </>
  );
}
