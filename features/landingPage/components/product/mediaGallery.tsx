"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IMedia } from "app/lib/types";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export function MediaGallery({ media }: { media: IMedia[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextIndex = activeIndex + 1 < media.length ? activeIndex + 1 : 0;
  const prevIndex = activeIndex === 0 ? media.length - 1 : activeIndex - 1;

  console.log(media, "media")
  const buttonClass =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center hover:cursor-pointer";

  const current = media[activeIndex];

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-lg bg-black">
        {current.mediaType === "image" ? (
          <Image
            fill
            src={current.url}
            alt={current.altText}
            className="object-contain h-full w-full"
            sizes="(min-width: 1024px) 66vw, 100vw"
            priority
          />
        ) : (
          <video
            key={current.url}
            controls
            className="h-full w-full object-contain"
            preload="metadata"
          >
            <source src={current.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {media.length > 1 && (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
              <button
                onClick={() => setActiveIndex(prevIndex)}
                aria-label="Previous media"
                className={buttonClass}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                onClick={() => setActiveIndex(nextIndex)}
                aria-label="Next media"
                className={buttonClass}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {media.length > 1 && (
        <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-x-auto py-1 lg:mb-0 overflow-y-hidden">
          {media.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={item._id || item.url} className="h-20 w-20">
                <button
                  onClick={() => setActiveIndex(index)}
                  className={clsx(
                    "h-full w-full rounded-md overflow-hidden ring-2 transition-all",
                    isActive ? "ring-blue-500" : "ring-transparent"
                  )}
                  aria-label={`Preview ${item.mediaType}`}
                >
                  {item.mediaType === "image" ? (
                    <img
                      src={item.url}
                      alt={item.altText}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={item.url}
                      muted
                      className="h-full w-full object-cover"
                      preload="metadata"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
