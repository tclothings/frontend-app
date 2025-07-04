"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setQuery(searchParams?.get("q") || "");
  }, [searchParams]);

  if (!hasMounted) return null; // prevent hydration mismatch

  const showSearchInput = ["/category", "/product", "/search"].some(
    (item) => pathname.startsWith(item) || pathname === "/"
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      newSearchParams.set("q", query);
      newSearchParams.delete("page");
      router.push(`/search?${newSearchParams.toString()}`);
    } else {
      newSearchParams.delete("q");
    }
  };
  return (
    <>
      {showSearchInput ? (
        // <Form
        //   action="/search"
        //   className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
        // >
        <form
          onSubmit={handleSearch}
          className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
        >
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
        </form>
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
