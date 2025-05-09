import SignIn from "@/components/auth/SignIn";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6 text-primary-foreground">
          Sign in
        </h1>
        <SignIn />
        <div className="mt-6 flex items-center px-5 sm:px-0 text-primary-foreground">
          <h1>{`Don't have an account?`}</h1>
          <Link className="font-bold ml-2 hover:underline" href="/signup">
            Sign Up
          </Link>
        </div>
        <div className="mt-3 flex items-center px-5 sm:px-0 text-primary-foreground">
          <Link className="font-bold hover:underline" href="/forgot-password">
            <h1>{`Forgot your password?`}</h1>
          </Link>
        </div>
      </section>
    </div>
  );
}
