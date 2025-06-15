"use client";
import Grid from "app/components/grid";
import { useProducts } from "app/api/client/products";
import Spinner from "app/components/form/spinner";
import ProductGridItems from "app/components/layout/product-grid-items";
import { useSearchParams } from "next/navigation";
import { defaultSort, sorting } from "app/lib/constants";
import { useEffect, useState } from "react";
import Pagination from "app/components/ui/pagination";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
const [totalPages, setTotalPages] = useState(0);

  const { sortKey } = sorting.find((item) => item.slug === sort) || defaultSort;

  const { products } = useProducts({ params: { [sortKey]: sort, page } });

  useEffect(() => {
    if (products.data) {
      setTotalPages(products.data?.totalPages);
    }
  }, [products.data]);

  if (!products?.data) return <Spinner />;

  const data = products.data?.products;
  return (
    <section>
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <ProductGridItems products={data} />
      </Grid>
      <Pagination totalPages={totalPages} />
    </section>
  );
}
