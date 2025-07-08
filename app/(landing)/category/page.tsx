import Category from "app/features/landingPage/pages/category";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={ null}>
      <Category />
</Suspense>
  );
}

