import SignIn from "@/components/auth/SignIn";
import Link from "next/link";
import OAuthButton from "@/components/auth/OAuthButton";

export default function SignInPage() {
  return (
    <div className="w-full flex mt-16 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6 text-primary-foreground">
          Welcome back!
        </h1>

        <div className="px-5 sm:px-0">
          <OAuthButton provider="Google" authType="Sign in" />
        </div>

        <div className="my-6 flex items-center">
          <span
            className="mr-3 grow border-t border-dotted border-gray-400"
            aria-hidden="true"
          />
          <p className="text-gray-400">Or, sign in with your email</p>
          <span
            className="ml-3 grow border-t border-dotted border-gray-400"
            aria-hidden="true"
          />
        </div>

        <SignIn />

        <div className="mt-6 flex items-center px-5 sm:px-0 text-primary-foreground">
          <p className="m-0">{`Don't have an account?`}</p>
          <Link className="font-bold ml-2 hover:underline" href="/signup">
            Sign Up
          </Link>
        </div>
        <div className="mt-3 flex items-center px-5 sm:px-0 text-primary-foreground">
          <Link className="font-bold hover:underline" href="/forgot-password">
            Forgot your password?
          </Link>
        </div>
      </section>
    </div>
  );
}
