import { User } from "@supabase/supabase-js";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ProfileCardProps = {
  user: User;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  const avatarUrl = user.user_metadata.avatar_url;
  const displayName =
    user.user_metadata.username || user.user_metadata.full_name || "User";
  const fallbackInitial =
    user.user_metadata.username?.[0]?.toUpperCase() ||
    user.user_metadata.full_name?.[0]?.toUpperCase() ||
    user.email?.[0]?.toUpperCase() ||
    "U";

  return (
    <Card className="flex h-full flex-col overflow-auto bg-black/10 text-card-foreground w-full max-w-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-primary-foreground">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 pt-4 items-center">
        <div className="flex space-x-4 items-center">
          <div className="rounded-full ring-2 ring-primary-foreground/50 p-1">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarUrl} alt={`${displayName}'s avatar`} />
              <AvatarFallback>{fallbackInitial}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="text-lg font-medium text-primary-foreground">
              {displayName}
            </p>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4">
        {user?.app_metadata.provider === "email" && (
          <Button variant="link" asChild className="ml-auto px-0 text-primary">
            <Link href="/update-password">Update Password</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
