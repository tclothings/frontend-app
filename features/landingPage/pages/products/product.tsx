"use client";
import { useRouter } from "next/navigation";

import { GridTileImage } from "app/components/layout/tile";
import ProductImageGallerySkeleton, {
  ProductDescription,
  ProductDescriptionSkeleton,
} from "app/features/landingPage/components/product/product-description";
import { IMedia, IProduct } from "app/lib/types";
import Link from "next/link";
import { useProducts } from "app/api/client/products";
import { useEffect } from "react";
import clsx from "clsx";
import { MediaGallery } from "../../components/product/mediaGallery";

export default function Product({ slug }: { slug: string }) {
  const router = useRouter();
  const { product } = useProducts({ enabled: false, id: slug });

  useEffect(() => {
    if (product.error) {
      router.back();
    }
  }, [product.error]);

  if (!product.data) {
    return <ProductSkeleton />;
  }

  const data = product?.data;

  const filteredMedia = data?.media
    // ?.filter((item: IMedia) => item.mediaType === "image")
    ?.map(({ url, altText, mediaType }: IMedia) => ({
      url,
      altText,
      mediaType,
    }));

  const media = [
    { url: data?.productImage, altText: data?.name, mediaType: "image" },
    ...(filteredMedia ?? []),
  ];
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) px-4 ">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 bg-[var(--grey-100)]  dark:bg-black">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <MediaGallery media={media?.slice(0, 5)} />
        </div>

        <div className="basis-full lg:basis-2/6">
          <ProductDescription product={data} />
        </div>
      </div>
      <RelatedProducts slug={data?.category?.slug} />
    </div>
  );
}

const RelatedProducts = ({ slug }: { slug: string }) => {
  const { productsByCategorySlug } = useProducts({ slug });

  if (!productsByCategorySlug.data) {
    return <RelatedProductsSkeleton />;
  }
  const data = productsByCategorySlug?.data?.products;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {data?.map((product: IProduct) => (
          <li
            key={product.slug}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.slug}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  // amount: product.priceRange.maxVariantPrice.amount,
                  // currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  amount: product.price,
                  salePrice: product.salePrice,
                  currencyCode: "NDN",
                }}
                src={product.productImage}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) px-4 ">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 bg-[var(--grey-100)]  dark:bg-black">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <ProductImageGallerySkeleton />
        </div>

        <div className="basis-full lg:basis-2/6">
          <ProductDescriptionSkeleton />
        </div>
      </div>
      <RelatedProductsSkeleton />
    </div>
  );
}

// This component represents a single skeleton for a product grid tile
function RelatedProductTileSkeleton() {
  return (
    <li
      className={clsx(
        "animate-pulse",
        "aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5", // Match original width classes
        "relative rounded-lg overflow-hidden", // For image and label positioning
        "bg-gray-200 dark:bg-neutral-700" // Placeholder background for the image
      )}
    >
      {/* Mimic the label overlay at the bottom */}
      <div className="absolute bottom-0 left-0 flex flex-col w-full px-2 pb-2">
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          {/* Title Placeholder */}
          <div className="h-3 bg-gray-300 dark:bg-neutral-600 rounded-md w-3/4 mr-2"></div>
          {/* Price Placeholder */}
          <div className="h-3 bg-blue-300 dark:bg-blue-600 rounded-full w-8"></div>
        </div>
      </div>
    </li>
  );
}

export function RelatedProductsSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx("py-8", className)}>
      {/* Heading Placeholder */}
      <div className="mb-4 h-6 w-1/3 bg-gray-200 dark:bg-neutral-700 rounded-md animate-pulse"></div>

      {/* List of Product Card Skeletons */}
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {/* Render multiple product tile skeletons */}
        {Array.from({ length: 5 }).map(
          (
            _,
            index // Example: show 5 related product skeletons
          ) => (
            <RelatedProductTileSkeleton key={index} />
          )
        )}
      </ul>
    </div>
  );
}
