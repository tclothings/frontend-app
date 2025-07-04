"use client";
import Grid from "app/features/landingPage/components/home/grid";
import ProductGridItems from "app/components/layout/product-grid-items";
import { defaultSort, sorting } from "app/lib/constants";
import Pagination from "app/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProducts } from "app/api/client/products";
import ProductsGridSkeleton from "../components/productsGridSkeleton";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  const [totalPages, setTotalPages] = useState(0);

  const { sortKey } = sorting.find((item) => item.slug === sort) || defaultSort;

  const { products } = useProducts({
    params: { search, [sortKey]: sort, page },
  });

  useEffect(() => {
    if (products.data) {
      setTotalPages(products.data?.totalPages);
    }
  }, [products.data]);

  if (!products?.data && products.isLoading) return <ProductsGridSkeleton />;

  const data = products.data?.products;
  const resultsText = data.length > 1 ? "results" : "result";

  return (
    <section className="h-full flex flex-col justify-between">
      <div>
        {search ? (
          <p className="mb-4">
            {data?.length === 0
              ? "There are no products that match"
              : `Showing ${products.data?.total} ${resultsText} for `}
            <span className="ml-2 font-bold">&quot;{search}&quot;</span>
          </p>
        ) : null}
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          <ProductGridItems products={data} />
        </Grid>
      </div>
      {totalPages ? <Pagination totalPages={totalPages} /> : null}
    </section>
  );
}
