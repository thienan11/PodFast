import SignUp from "@/components/auth/SignUp";
import Link from "next/link";
import OAuthButton from "@/components/auth/OAuthButton";

export default async function SignUpPage() {
  return (
    <div className="w-full flex mt-16 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6 text-primary-foreground">
          Ready to start?
        </h1>

        <div className="px-5 sm:px-0">
          <OAuthButton provider="google" authType="Sign up" />
        </div>

        <div className="my-6 flex items-center">
          <span
            className="mr-3 grow border-t border-dotted border-gray-400"
            aria-hidden="true"
          />
          <p className="text-gray-400">Or, sign up with your email</p>
          <span
            className="ml-3 grow border-t border-dotted border-gray-400"
            aria-hidden="true"
          />
        </div>

        <SignUp />

        <div className="mt-6 flex items-center px-5 sm:px-0 text-primary-foreground">
          <p>Already have an account?</p>
          <Link
            className="font-bold ml-2 hover:underline text-primary-foreground"
            href="/signin"
          >
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}
