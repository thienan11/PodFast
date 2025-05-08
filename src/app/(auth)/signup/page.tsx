import SignUp from "@/components/auth/SignUp";
import Link from "next/link";

export default async function SignUpPage() {
  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Sign Up</h1>
        <SignUp />
        <div className="mt-6 flex items-center px-5 sm:px-0">
          <h1>Already have an account?</h1>
          <Link className="font-bold ml-2 hover:underline" href="/signin">
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}
