// import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// import ProductGridItems from 'components/layout/product-grid-items';
// import { defaultSort, sorting } from 'lib/constants';
import Grid from 'app/components/grid';
import { getCollectionProducts } from 'app/lib';
import ProductGridItems from 'app/components/layout/product-grid-items';
import Category from 'app/features/landingPage/pages/category';

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
}) {

  const params = await props.params;

  return <Category slug={params.collection} />;
}
