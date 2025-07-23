"use client";

import { useProducts } from "app/apis/products";
import Grid from "app/features/landingPage/components/home/grid";
import ProductGridItems from "app/components/layout/product-grid-items";
import Pagination from "app/components/ui/pagination";
import { defaultSort, sorting } from "app/lib/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductsGridSkeleton from "../components/productsGridSkeleton";

const Collection = ({ slug }: { slug: string }) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const [totalPages, setTotalPages] = useState(0);

  const { sortKey } = sorting.find((item) => item.slug === sort) || defaultSort;

  const { productsByCategorySlug: products } = useProducts({
    slug,
    params: { [sortKey]: sort, page },
  });

  useEffect(() => {
    if (products.data) {
      setTotalPages(products.data?.totalPages);
    }
  }, [products.data]);

  if (!products.data && products.isLoading) return <ProductsGridSkeleton />;

  const data = products.data?.products;

  return (
    <section className="h-full flex flex-col justify-between">
      {!data?.length ? (
        <p className="mb-4">No products found in this category</p>
      ) : (
        <>
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            <ProductGridItems products={data} />
          </Grid>
          <Pagination totalPages={totalPages} />{" "}
        </>
      )}
    </section>
  );
};

export default Collection;
