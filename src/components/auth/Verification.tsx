"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { resendConfirmationEmail } from "@/app/(auth)/actions";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function Verification() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const handleClick = () => {
    router.push("/signin");
  };

  const handleResendEmail = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const response = await resendConfirmationEmail(email as string);

    if (response.status === "success") {
      toast.success("Email sent successfully!");
    } else {
      setError(response.status);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-12 md:pb-20">
          {/* Page header */}
          <div className="md:pb-15 mx-auto max-w-3xl pb-10 text-center text-2xl md:text-3xl lg:text-4xl">
            <h1 className="h1 leading-tight text-primary-foreground">
              We&apos;ve sent you an email for confirmation
            </h1>
          </div>
          <div className="mx-auto max-w-xl">
            <div className="flex items-center">
              <div
                className="mr-3 grow border-t border-dotted border-gray-700"
                aria-hidden="true"
              ></div>
              <div className="text-primary-foreground/70">
                If you&apos;ve already confirmed your email, please sign in
                below
              </div>
              <div
                className="ml-3 grow border-t border-dotted border-gray-700"
                aria-hidden="true"
              ></div>
            </div>
            <div className="-mx-3 mt-11 flex flex-wrap">
              <div className="w-full px-3 text-center">
                <Button
                  size={"lg"}
                  onClick={handleClick}
                  className="w-full bg-primary text-white hover:bg-primary/60 cursor-pointer"
                >
                  Sign in
                </Button>
                <div className="mt-4 text-muted-foreground">
                  Make sure to check your spam folder if you don&apos;t see it!
                </div>
                {email && (
                  <div className="mt-2 text-muted-foreground">
                    Didn&apos;t receive an email?{" "}
                    <Button
                      onClick={() => handleResendEmail()}
                      variant={"link"}
                      className="p-0 text-primary cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Resending..." : "Resend email"}
                    </Button>
                  </div>
                )}
                {error && <p className="text-red-500 pt-10">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
