// import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// import ProductGridItems from 'components/layout/product-grid-items';
// import { defaultSort, sorting } from 'lib/constants';
import Grid from 'app/components/grid';
import { getCollectionProducts } from 'app/lib';
import ProductGridItems from 'app/components/layout/product-grid-items';

// export async function generateMetadata(props: {
//   params: Promise<{ collection: string }>;
// }): Promise<Metadata> {
//   const params = await props.params;
  // const collection = await getCollection(params.collection);

//   if (!collection) return notFound();

//   return {
//     title: collection.seo?.title || collection.title,
//     description:
//       collection.seo?.description || collection.description || `${collection.title} products`
//   };
// }

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const products = await getCollectionProducts();
  
    if (!products?.length) return null;
  
    // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];
  
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  // const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  // const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  return (
    <section>
      {carouselProducts?.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
