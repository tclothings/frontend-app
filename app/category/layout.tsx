import Footer from 'app/components/layout/footer';
import Collections from 'app/components/layout/search/collections';
import FilterList from 'app/components/layout/search/filter';
import { sorting } from 'app/lib/constants';
import ChildrenWrapper from './children-wrapper';
import { Suspense } from 'react';

export default function CategoryLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="z-40 dark:bg-black rounded-md md:min-h-[calc(100vh-200px)]  order-first w-full flex-none md:max-w-[180px]">
          <Collections />
        </div>
        <div className="order-last w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="z-40 dark:bg-black rounded-md  md:min-h-[calc(100vh-200px)] order-none flex-none md:order-last md:w-[180px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
