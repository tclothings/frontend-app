import Category from "app/features/landingPage/pages/category";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={ null}>
      <Category />
</Suspense>
  );
}

// export default function Page() {
//   const searchParams = useSearchParams();
//   const sort = searchParams.get("sort");
//   const page = searchParams.get("page");
// const [totalPages, setTotalPages] = useState(0);

//   const { sortKey } = sorting.find((item) => item.slug === sort) || defaultSort;

//   const { products } = useProducts({ params: { [sortKey]: sort, page } });

//   useEffect(() => {
//     if (products.data) {
//       setTotalPages(products.data?.totalPages);
//     }
//   }, [products.data]);

//   if (!products?.data) return <Spinner />;

//   const data = products.data?.products;
//   return (
//     <section>
//       <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
//         <ProductGridItems products={data} />
//       </Grid>
//       <Pagination totalPages={totalPages} />
//     </section>
//   );
// }
