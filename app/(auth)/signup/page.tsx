import Signup from "app/features/auth/Signup";
import { Suspense } from "react";

export default function Page() {

  return (
    <Suspense fallback={null}>
      <Signup />
      </Suspense>
  );
}
