import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import ProfileCard from "@/components/dashboard/ProfileCard";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/signin");
  }

  return (
    <div className="flex items-center justify-center m-20">
      <ProfileCard user={data.user} />
    </div>
  );
}
