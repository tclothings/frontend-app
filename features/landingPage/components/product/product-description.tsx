import { AddToCart, AddToCartButtonSkeleton } from "app/components/cart/add-to-cart";
import Price, { PriceSkeleton } from "app/components/price";
import Prose, { ProseSkeleton } from "app/components/prose";
import { IProduct } from "app/lib/types";

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
      <AddToCartButtonSkeleton />
    </>
  );
}
