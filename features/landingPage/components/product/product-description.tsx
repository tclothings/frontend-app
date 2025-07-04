import { AddToCart, AddToCartButtonSkeleton } from "app/components/cart/add-to-cart";
import Price, { PriceSkeleton } from "app/components/price";
import Prose, { ProseSkeleton } from "app/components/prose";
import { IProduct } from "app/lib/types";
import clsx from "clsx";

export function ProductDescription({ product }: { product: IProduct }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            className="flex"
            amount={product.price}
            currencyCode="NGN"
            // amount={product.priceRange.maxVariantPrice.amount}
            // currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      {/* <VariantSelector options={product.options} /> */}
      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}

export function ProductDescriptionSkeleton() {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="animate-pulse h-5 w-[50%] bg-gray-300 dark:bg-neutral-700 mb-2 text-5xl font-medium"></h1>
        <div className="mr-auto animate-pulse h-5 w-20 rounded-full bg-blue-600 p-2 text-sm text-white flex items-center">
          <PriceSkeleton />
        </div>
      </div>
      {/* <VariantSelector options={product.options} /> */}
      <ProseSkeleton />
      <div className="mt-6">
        <AddToCartButtonSkeleton />
      </div>
    </>
  );
}

export default function ProductImageGallerySkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={clsx("animate-pulse", className)}>
      {/* Main Image Display Area Skeleton */}
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden bg-gray-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
        {/* Placeholder for the main product image */}

        {/* Skeleton for Image Navigation Buttons */}
        {/* We always show these in the skeleton to indicate this functionality might exist */}
        <div className="absolute bottom-[15%] flex w-full justify-center">
          <div className="mx-auto flex h-11 items-center rounded-full border border-gray-300 bg-neutral-100/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-800/80">
            {/* Left Button Skeleton */}
            <div className="flex h-full w-10 items-center justify-center">
              <div className="h-5 w-5 bg-gray-400 dark:bg-neutral-600 rounded-full"></div>{" "}
              {/* Placeholder for ArrowLeftIcon */}
            </div>
            {/* Divider Skeleton */}
            <div className="mx-1 h-6 w-px bg-gray-400 dark:bg-neutral-600"></div>
            {/* Right Button Skeleton */}
            <div className="flex h-full w-10 items-center justify-center">
              <div className="h-5 w-5 bg-gray-400 dark:bg-neutral-600 rounded-full"></div>{" "}
              {/* Placeholder for ArrowRightIcon */}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail List Skeleton */}
      {/* Always show skeleton for thumbnails to suggest a gallery */}
      <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-x-auto py-1 lg:mb-0 overflow-y-hidden">
        {/* Render multiple thumbnail placeholders (e.g., 4 or 5) */}
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="h-20 w-20 bg-gray-200 dark:bg-neutral-700 rounded-md"
          >
            {/* Individual thumbnail placeholder */}
          </li>
        ))}
      </ul>
    </div>
  );
}