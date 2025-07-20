"use client"
import NavList from "app/components/layout/account/navList";
import FilterList from "app/components/layout/categories/filter";
import { sorting } from "app/lib/constants";
import { usePathname } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const pathname = usePathname()
  const isShowFilter = pathname === "/orders"
  return (
    <>
      <div className="mx-auto flex max-w-[--breakpoint-2xl] w-full flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        {/* Left Sidebar */}
        <div className="bg-[var(--grey-100)] dark:bg-black rounded-md order-first w-full md:w-[200px] md:min-w-[180px] md:max-w-[220px] md:min-h-[calc(100vh-200px)] h-full">
          <NavList />
        </div>
        {/* Middle Content */}
        <div className="order-last bg-[var(--grey-100)] dark:bg-black rounded-md flex-1 min-w-[300px] min-h-[calc(100vh-200px)] h-full md:order-none">
          {children}
        </div>
        {/* Right Sidebar */}
        {isShowFilter &&
          <div className="bg-[var(--grey-100)] dark:bg-black rounded-md order-none md:order-last md:w-[180px] md:min-w-[150px] md:max-w-[200px] md:min-h-[calc(100vh-200px)] h-full">
            <FilterList list={sorting} title="Sort by" />
          </div>
        }
      </div>

      {/* <Footer /> */}
    </>
  );
}
