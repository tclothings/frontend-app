import ForgotPassword from "app/features/auth/ForgotPassword";
import { Suspense } from "react";

export default function Page() {

  return (
    <Suspense fallback={null}>
      <ForgotPassword />
    </Suspense>
  );
}
