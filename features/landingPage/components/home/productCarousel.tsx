"use client"; // Keep this at the top for client-side rendering

import { Carousel } from "app/components/layout/carousel";
import { useProducts } from "app/api/client/products";
import { GridTileImageSkeleton } from "app/components/layout/tile";

export function ProductCarousel() {
  const { products } = useProducts({enabled: true});

  if (products.isLoading) {
    return <CarouselSkeleton />;
  }
  const data = products?.data?.products;
  if (!data?.length) return null;

  const carouselProducts = data;
  return <Carousel data={carouselProducts} />;
}

export const CarouselSkeleton = () => {
  return (
    <div className="w-full pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <li
            key={i}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3 animate-pulse"
          >
            <GridTileImageSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};