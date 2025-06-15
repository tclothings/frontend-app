"use client";
import { getCollectionProducts } from "app/lib";
import Link from "next/link";
import { GridTileImage, GridTileImageSkeleton } from "./grid/tile";
import { useProducts } from "app/api/client/products";
import Spinner from "./form/spinner";
import { IProduct } from "app/lib/types";
import clsx from "clsx";

export function Carousel() {
  const { products } = useProducts();

  if (!products.data) {
    return <CarouselSkeleton />;
  }

  const data = products?.data?.products;
  if (!data?.length) return null;

  const carouselProducts = data;

  return (
    <div className="w-full overflow-x-scroll custom-scrollbar pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product: IProduct, i: number) => (
          <li
            key={`${product.slug}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.slug}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price,
                  salePrice: product.salePrice,
                  currencyCode: "NGN",
                }}
                src={product.productImage}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const CarouselSkeleton = () => {
  return (
    <div className="w-full overflow-x-scroll custom-scrollbar pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        <li className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3 animate-pulse">
          <GridTileImageSkeleton />
        </li>
        <li className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3 animate-pulse">
          <GridTileImageSkeleton />
        </li>{" "}
        <li className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3 animate-pulse">
          <GridTileImageSkeleton />
        </li>{" "}
        <li className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3 animate-pulse">
          <GridTileImageSkeleton />
        </li>{" "}
        <li className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3 animate-pulse">
          <GridTileImageSkeleton />
        </li>{" "}
        <li className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3 animate-pulse">
          <GridTileImageSkeleton />
        </li>
      </ul>
    </div>
  );
};
