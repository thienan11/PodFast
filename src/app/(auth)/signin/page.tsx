import SignIn from "@/components/auth/SignIn";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Sign in</h1>
        <SignIn />
        <div className="mt-6 flex items-center px-5 sm:px-0">
          <h1>{`Don't have an account?`}</h1>
          <Link className="font-bold ml-2 hover:underline" href="/signup">
            Sign Up
          </Link>
        </div>
        <div className="mt-3 flex items-center px-5 sm:px-0">
          <h1>{`Forgot your password?`}</h1>
          <Link
            className="font-bold ml-2 hover:underline"
            href="/reset-password"
          >
            Reset Password
          </Link>
        </div>
      </section>
    </div>
  );
}
