import FilterList from "app/components/layout/categories/filter";
import { sorting } from "app/lib/constants";
import { Suspense } from "react";
import Collections from "app/features/landingPage/components/categories/collections";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="z-40 bg-[var(--grey-100)] dark:bg-black rounded-md md:min-h-[calc(100vh-200px)]  order-first w-full flex-none md:max-w-[180px]">
          <Collections />
        </div>
        <div className="order-last w-full md:order-none py-4">
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </div>
        <div className="z-40 bg-[var(--grey-100)] dark:bg-black rounded-md  md:min-h-[calc(100vh-200px)] order-none flex-none md:order-last md:w-[180px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
    </>
  );
}
