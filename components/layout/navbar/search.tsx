'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search() {
    const pathname = usePathname();
  
  const searchParams = useSearchParams();
const showSearchInput = ["/category", "/product"].some((item) =>
  pathname.startsWith(item) || pathname === "/"
  );
   const [query, setQuery] = useState("");

   useEffect(() => {
     setQuery(searchParams?.get("q") || "");
   }, [searchParams]);
  
  return (
    <>
      {showSearchInput ? (
        // <Form
        //   action="/search"
        //   className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
        // >
        <>
          <input
            type="text"
            // name="q"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          />
          <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
            <MagnifyingGlassIcon className="h-4" />
          </div>
        </>
      ) : // </Form>
      null}
    </>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
