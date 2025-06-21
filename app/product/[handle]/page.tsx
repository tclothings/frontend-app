import Product from "app/features/landingPage/pages/products/product";

// export async function generateMetadata(props: {
//   params: Promise<{ handle: string }>;
// }): Promise<Metadata> {
//   const params = await props.params;
//   const product = await getProduct(params.handle);

//   if (!product) return notFound();

//   const { url, width, height, altText: alt } = product.featuredImage || {};
//   // const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

//   return {
//     // title: product.seo.title || product.title,
//     // description: product.seo.description || product.description,
//     title: product.title,
//     description: product.description,
//     // robots: {
//     //   index: indexable,
//     //   follow: indexable,
//     //   googleBot: {
//     //     index: indexable,
//     //     follow: indexable,
//     //   },
//     // },
//     openGraph: url
//       ? {
//           images: [
//             {
//               url,
//               width,
//               height,
//               alt,
//             },
//           ],
//         }
//       : null,
//   };
// }

export default async function Page(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;

  return <Product slug={params.handle} />;
}

