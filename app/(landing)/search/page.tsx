import Search from "app/features/landingPage/pages/search";
import { Suspense } from "react";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function Page() {
  return (
    <Suspense fallback={null}>
      <Search />{" "}
    </Suspense>
  );
}
