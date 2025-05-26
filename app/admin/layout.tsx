import NavList from "app/components/layout/account/navList";
import FilterList from "app/components/layout/search/filter";
import { sorting } from "app/lib/constants";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) w-full flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="dark:bg-black rounded-md order-first w-full md:min-h-[calc(100vh-200px)] h-full md:max-w-[180px]">
          <NavList />
        </div>
        <div className="order-last dark:bg-black rounded-md min-h-[calc(100vh-200px)] h-full md:max-w-[60vw] w-full lg:max-w-[70vw] md:order-none">
          {children}
        </div>
        <div className="md:max-w-[150px] dark:bg-black rounded-md order-none md:order-last md:max-w-[125px] w-full md:min-h-[calc(100vh-200px)] h-full">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
