"use client"
import { Suspense } from "react";
import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";
import { SortFilterItemType } from "app/lib/types";
export type ListItem = SortFilterItemType | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
      {/* <li className="mt-2 flex text-black dark:text-white">
            <button
              className={clsx(
                'w-full underline-offset-4 hover:underline dark:hover:text-neutral-100',
              )}
            >
              Logout
            </button>
          </li> */}
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
  }) {

  return (
    <>
      <nav>
        {title ? (
          <h3 className="hidden text-2xl text-neutral-500 md:block dark:text-neutral-400 mb-10 p-4">
            {title}
          </h3>
        ) : null}
        <ul className="hidden md:block">
          {/* <Suspense fallback={null}> */}
            <FilterItemList list={list} />
          {/* </Suspense> */}
        </ul>
        <ul className="md:hidden">
          <Suspense fallback={null}>
            <FilterItemDropdown list={list} />
          </Suspense>
        </ul>
      </nav>
    </>
  );
}
