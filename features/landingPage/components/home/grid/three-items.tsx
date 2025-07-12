"use client";
import { useProducts } from "app/api/products";
import { GridTileImage } from "app/components/layout/tile";
import type { IProduct } from "app/lib/types";
import clsx from "clsx";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: IProduct;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={clsx(
        "shadow-md hover:shadow-lg transition-shadow",
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      )}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.slug}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.productImage}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.name as string,
            salePrice: item.salePrice,
            amount: item.price,
            currencyCode: "NGN",
            // amount: item.priceRange.maxVariantPrice.amount,
            // currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGrid() {
  const { products } = useProducts({
    params: { isFeatured: true },
    enabled: true,
  });

  if (!products.data) {
    return <ThreeItemGridSkeleton />;
  }
  const featuredProducts = products?.data?.products;

  const [firstProduct, secondProduct, thirdProduct] = featuredProducts;

  return (
    <div className="w-full mx-auto">
      {!featuredProducts?.length ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-600">
          {/* Option 1: Simple Message with Call to Action */}
          <p className="text-xl font-semibold mb-4">
            No featured products available right now.
          </p>
          <p className="text-md mb-6">
            We're working hard to add exciting new items. Please check back
            soon!
          </p>
          <Link
            href={"/category"}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Categories
          </Link>

          {/* Option 2: With an illustration (requires an illustration component/image) */}
          {/* <img src="/path/to/empty-cart-illustration.svg" alt="No products" className="w-48 h-48 mb-6" />
    <p className="text-xl font-semibold mb-4">Our shelves are a little bare!</p>
    <p className="text-md mb-6">We'll have new products for you very soon. In the meantime...</p>
    <a href="/newsletter-signup" className="text-blue-600 hover:underline">Sign up for updates</a> */}
        </div>
      ) : (
        <section className="w-full mx-auto grid max-w-(--breakpoint-2xl) lg:max-h-[calc(100vh-200px)] h-full  gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
          {firstProduct && (
            <ThreeItemGridItem
              size="full"
              item={firstProduct}
              priority={true}
            />
          )}
          {secondProduct && (
            <ThreeItemGridItem
              size="half"
              item={secondProduct}
              priority={true}
            />
          )}
          {thirdProduct && (
            <ThreeItemGridItem size="half" item={thirdProduct} />
          )}
        </section>
      )}
    </div>
  );
}

export const ThreeItemGridSkeleton = () => {
  return (
    <section className="w-full mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2  h-full animate-pulse">
      <ThreeItemGridItemSkeleton size="full" />
      <ThreeItemGridItemSkeleton size="half" />
      <ThreeItemGridItemSkeleton size="half" />
    </section>
  );
};

export const ThreeItemGridItemSkeleton = ({
  size,
}: {
  size: "full" | "half";
}) => {
  return (
    <div
      className={clsx(
        "shadow-md hover:shadow-lg transition-shadow animate-pulse  bg-neutral-200 dark:bg-neutral-700",
        size === "full"
          ? "md:col-span-4 md:row-span-2 h-[600px]"
          : "md:col-span-2 md:row-span-1 h-[292px]"
      )}
    >
      {/* <GridTileImageSkeleton /> */}
    </div>
  );
};
