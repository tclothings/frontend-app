import Collections from 'app/components/layout/search/collections';
import FilterList from 'app/components/layout/search/filter';
import { sorting } from 'app/lib/constants';
import ChildrenWrapper from './children-wrapper';
import { Suspense } from 'react';

export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="z-40 bg-[var(--background)] order-first w-full flex-none md:max-w-[125px] sticky top-20 self-start">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="z-40 bg-[var(--background)]  order-none flex-none md:order-last md:w-[125px] sticky top-[145px] md:sticky md:top-20 self-start">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
