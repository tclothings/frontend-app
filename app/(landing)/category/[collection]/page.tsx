// import { notFound } from 'next/navigation';

import Collection from 'app/features/landingPage/pages/collection';

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

export default async function Page(props: {
  params: Promise<{ collection: string }>;
}) {

  const params = await props.params;

  return <Collection slug={params.collection} />;
}
