import AuthCodeErrorComponent from "@/components/auth/AuthError";
import { Suspense } from "react";

export default function AuthCodeError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCodeErrorComponent />
    </Suspense>
  );
}
