import { cookies, headers } from "next/headers";
import { Cart, Collection, Product } from "./types";

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return undefined;
  }
}
//     export async function createCart(): Promise<Cart> {
//   const res = await shopifyFetch<ShopifyCreateCartOperation>({
//     query: createCartMutation
//   });

//   return reshapeCart(res.body.data.cartCreate.cart);
// }

// export async function addToCart(
//   lines: { merchandiseId: string; quantity: number }[]
// ): Promise<Cart> {
//   const cartId = (await cookies()).get('cartId')?.value!;
//   const res = await shopifyFetch<ShopifyAddToCartOperation>({
//     query: addToCartMutation,
//     variables: {
//       cartId,
//       lines
//     }
//   });
//   return reshapeCart(res.body.data.cartLinesAdd.cart);
// }

// export async function removeFromCart(lineIds: string[]): Promise<Cart> {
//   const cartId = (await cookies()).get('cartId')?.value!;
//   const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
//     query: removeFromCartMutation,
//     variables: {
//       cartId,
//       lineIds
//     }
//   });

//   return reshapeCart(res.body.data.cartLinesRemove.cart);
// }

// export async function updateCart(
//   lines: { id: string; merchandiseId: string; quantity: number }[]
// ): Promise<Cart> {
//   const cartId = (await cookies()).get('cartId')?.value!;
//   const res = await shopifyFetch<ShopifyUpdateCartOperation>({
//     query: editCartItemsMutation,
//     variables: {
//       cartId,
//       lines
//     }
//   });

//   return reshapeCart(res.body.data.cartLinesUpdate.cart);
// }

const productsData = [
  {
    id: "1",
    title: "Jacket",
    handle: "jacket",
    featuredImage: {
      url: "/images/sample/jacket.webp",
      altText: "jacket",
      width: 1000,
      height: 1000,
    },
    descriptionHtml:
      "Add a little zing to your winter wardrobe with this vibrant Winter-breaker Jacket. With a brushed fleece inside, and a relaxed unisex fit, this jacket is just the stuff of the dreams, so be quick to grab yourself one! Long sleeve ripstop jacket colorblocked in black. Rough pattern in obsidian black and brown printed throughout. Printed graphic in white throughout. Logo-woven webbing trim in white and black throughout. Bungee-style drawstring at hood featuring rubberized logo hardware. Zip closure at front. Rubberized logo appliqué at chest. Welt pockets and textile logo patch in orange at waist. Elasticized cuffs. Partially lined. Black hardware.",
    description:
      "Logo-woven webbing trim in white and black throughout. Bungee-style drawstring at hood featuring rubberized logo hardware. Zip closure at front. Rubberized logo appliqué at chest. Welt pockets and textile logo patch in orange at waist. Elasticized cuffs. Partially lined. Black hardware.",
    options: [
      { id: "color", name: "COLOR", values: ["WHITE", "BLACK"] },
      { id: "size", name: "SIZE", values: ["S", "M", "L"] },
    ],
    images: [
      {
        url: "/images/sample/jacket.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/jacket_2.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/jacket_3.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/joggers.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/shirt.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/trousers.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
    ],
    totalQuantity: 20,
    price: 5000,
  },
  {
    id: "2",
    title: "Joggers",
    handle: "joggers",
    featuredImage: {
      url: "/images/sample/joggers.webp",
      altText: "joggers",
      width: 300,
      height: 300,
    },
    descriptionHtml:
      "Add a little zing to your winter wardrobe with this vibrant Winter-breaker Jacket. With a brushed fleece inside, and a relaxed unisex fit, this jacket is just the stuff of the dreams, so be quick to grab yourself one! Long sleeve ripstop jacket colorblocked in black. Rough pattern in obsidian black and brown printed throughout. Printed graphic in white throughout. Logo-woven webbing trim in white and black throughout. Bungee-style drawstring at hood featuring rubberized logo hardware. Zip closure at front. Rubberized logo appliqué at chest. Welt pockets and textile logo patch in orange at waist. Elasticized cuffs. Partially lined. Black hardware.",
    description:
      "Logo-woven webbing trim in white and black throughout. Bungee-style drawstring at hood featuring rubberized logo hardware. Zip closure at front. Rubberized logo appliqué at chest. Welt pockets and textile logo patch in orange at waist. Elasticized cuffs. Partially lined. Black hardware.",
    options: [
      { id: "color", name: "COLOR", values: ["WHITE", "BLACK"] },
      // { id: "size", name: "SIZE", values: ["S", "M", "L"] },
    ],
    images: [
      {
        url: "/images/sample/jacket.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/jacket_2.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/jacket_3.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/joggers.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/shirt.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/trousers.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
    ],
    totalQuantity: 10,
    price: 3000,
  },
  {
    id: "3",
    title: "Jacket_2",
    handle: "jacket_2",
    featuredImage: {
      url: "/images/sample/jacket_2.webp",
      altText: "jacket_2",
      width: 300,
      height: 300,
    },
    descriptionHtml:
      "Add a little zing to your winter wardrobe with this vibrant Winter-breaker Jacket. With a brushed fleece inside, and a relaxed unisex fit, this jacket is just the stuff of the dreams, so be quick to grab yourself one! Long sleeve ripstop jacket colorblocked in black. Rough pattern in obsidian black and brown printed throughout. Printed graphic in white throughout. Logo-woven webbing trim in white and black throughout. Bungee-style drawstring at hood featuring rubberized logo hardware. Zip closure at front. Rubberized logo appliqué at chest. Welt pockets and textile logo patch in orange at waist. Elasticized cuffs. Partially lined. Black hardware.",
    description:
      "Logo-woven webbing trim in white and black throughout. Bungee-style drawstring at hood featuring rubberized logo hardware. Zip closure at front. Rubberized logo appliqué at chest. Welt pockets and textile logo patch in orange at waist. Elasticized cuffs. Partially lined. Black hardware.",
    options: [
      { id: "color", name: "COLOR", values: ["WHITE", "BLACK"] },
      { id: "size", name: "SIZE", values: ["S", "M", "L"] },
    ],
    images: [
      {
        url: "/images/sample/jacket.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/jacket_2.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/jacket_3.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/joggers.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/shirt.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
      {
        url: "/images/sample/trousers.webp",
        altText: "img",
        width: 400,
        height: 400,
      },
    ],
    totalQuantity: 5,
    price: 10000,
  },
];

export async function getCollectionProducts(): Promise<Product[]> {
  //   'use cache';
  //   cacheTag(TAGS.collections, TAGS.products);
  //   cacheLife('days');

  //   const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
  //     query: getCollectionProductsQuery,
  //     variables: {
  //       handle: collection,
  //       reverse,
  //       sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
  //     },
  //   });

  //   if (!res.body.data.collection) {
  //     console.log(`No collection found for \`${collection}\``);
  //     return [];
  //   }

  return productsData;
}

export async function getCollections(): Promise<Collection[]> {
  // "use cache";
  // const res = await shopifyFetch<ShopifyCollectionsOperation>({
  //   query: getCollectionsQuery,
  // });
  // const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: {
        title: "All",
        description: "All products",
      },
      path: "/category",
      updatedAt: new Date().toISOString(),
    },
    {
      handle: "",
      title: "Bags",
      description: "Bags",
      seo: {
        title: "Bags",
        description: "Bags",
      },
      path: "/category/bags",
      updatedAt: new Date().toISOString(),
    },
    {
      handle: "",
      title: "Shoes",
      description: "Shoes",
      seo: {
        title: "Shoes",
        description: "Shoes",
      },
      path: "/category/shoes",
      updatedAt: new Date().toISOString(),
    },
  ];

  return collections;
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  // "use cache";
  // cacheTag(TAGS.products);
  // cacheLife("days");

  return productsData;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  // "use cache";
  // cacheTag(TAGS.products);
  // cacheLife("days");

  // const res = await shopifyFetch<ShopifyProductOperation>({
  //   query: getProductQuery,
  //   variables: {
  //     handle,
  //   },
  // });

  return productsData[0];
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  // "use cache";
  // cacheTag(TAGS.products);
  // cacheLife("days");

  // const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
  //   query: getProductRecommendationsQuery,
  //   variables: {
  //     productId,
  //   },
  // });

  return productsData;
}
