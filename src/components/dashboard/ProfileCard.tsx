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
  return (
    <Card className="flex h-full flex-col overflow-auto bg-gray-100/10 text-card-foreground">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 pt-4">
        <div className="flex space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={user.user_metadata.avatar_url}
              alt={user?.user_metadata.username || "User avatar"}
            />
            <AvatarFallback>
              {user?.user_metadata.username?.[0].toUpperCase() ||
                user?.email?.[0] ||
                "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-medium">
              {user?.user_metadata.username ?? "User"}
            </p>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4">
        {user?.app_metadata.provider === "email" && (
          <Button variant="link" asChild className="ml-auto px-0 text-primary">
            <Link href="/reset-password">Update Password</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
