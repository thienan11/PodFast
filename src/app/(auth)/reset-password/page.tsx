import ResetPassword from "@/components/auth/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <>
      <div className="w-full flex mt-20 justify-center">
        <section className="flex flex-col w-[400px] px-5 sm:px-0">
          <div className="mx-auto max-w-3xl pb-6 text-center">
            <h1 className="text-3xl w-full text-center font-bold mb-6 text-primary-foreground">
              Forgot your password?
            </h1>
            <p className="text-lg text-gray-500">
              We&apos;ll email you instructions on how to reset it.
            </p>
          </div>
          <ResetPassword />
        </section>
      </div>
    </>
  );
}
