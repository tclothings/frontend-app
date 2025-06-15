"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "app/components/grid/tile";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  // const { state, updateImage } = useProduct();
  // const updateURL = useUpdateURL();
  const [imageIndex, setImageIndex] = useState(0);

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center hover:cursor-pointer";

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
              <button
                onClick={() => setImageIndex(previousImageIndex)}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                onClick={() => setImageIndex(nextImageIndex)}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-x-auto py-1 lg:mb-0 overflow-y-hidden">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-20 w-20">
                <button type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label="Select product image"
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
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