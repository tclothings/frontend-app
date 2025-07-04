"use client"
import clsx from 'clsx';
import { Suspense, useEffect, useState } from 'react';

// import { getCollections } from 'app/lib';
import FilterList from './filter';
import { useCategories } from 'app/api/client/categories';
import { allCategory } from 'app/lib/constants';
import { capitalizeWord } from 'app/lib/utils';
import { ICategory } from 'app/lib/types';

function CollectionList() {
   const [collections, setCollections] = useState([
     allCategory
   ]);
  const { categories } = useCategories({ params: { isActive: true } } );
  
  useEffect(() => {
    if (categories.data) {
      if (categories.data?.categories?.length) {
        const categoryList = [
          ...collections,
          ...(categories.data?.categories?.map((category: ICategory) => ({
            handle: category.slug,
            title: capitalizeWord(category.name),
            description: category.description,
            seo: {
              title: category.name,
              description: category.description,
            },
            path: `/category/${category.slug}`,
          })) || []),
        ];
        setCollections(categoryList);
      }
     
    }
  }, [categories.data]);
   
  return <FilterList list={collections} title="Collections" />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded-sm';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function
  Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
