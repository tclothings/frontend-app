"use client"; // Keep this at the top for client-side rendering

import Link from "next/link";
import { IProduct } from "app/lib/types";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css"; // Core Swiper styles
import "swiper/css/autoplay"; // Styles for the Autoplay module

// Import required Swiper modules
import { Autoplay } from "swiper/modules";
import { GridTileImage } from "./tile";

export function Carousel({ data }: { data: any[] }) {
  // Handle empty data: Don't render the carousel if no products
  if (!data?.length) {
    return null;
  }

  const carouselProducts = data; // Swiper's 'loop' prop handles duplication internally

  return (
    <div className="w-full pb-6 pt-1">
      <Swiper
        // --- Swiper Configuration ---
        modules={[Autoplay]} // Enable the Autoplay module
        spaceBetween={16} // Space between slides, corresponds to 'gap-4' (4 units * 4px/unit = 16px)
        slidesPerView="auto" // Allows slides to take their own width as defined by Tailwind classes
        loop={true} // Essential for a seamless infinite loop
        autoplay={{
          delay: 0, // No delay between slides for continuous movement
          disableOnInteraction: false, // Keep autoplaying even if the user interacts
          pauseOnMouseEnter: true, // Optional: Pause autoplay when mouse enters Swiper
        }}
        speed={5000} // Adjust this value to control the speed of the scroll (in milliseconds).
        // Higher value = slower scroll.
        grabCursor={true} // Show a grabbing cursor when hovering over the carousel
        className="mySwiper" // Add a class for potential custom Swiper styles
        // --- Responsive Breakpoints (Optional but Recommended) ---
        // These allow you to fine-tune how many slides are visible or their behavior
        // based on screen size, overriding 'slidesPerView="auto"' if needed for specific breakpoints.
        // For example, if you want exactly 3 items on tablet and 4 on desktop:
        breakpoints={{
          // 640px (sm)
          640: {
            // slidesPerView: 2, // Example: show 2 full items on small screens
          },
          // 768px (md)
          768: {
            // slidesPerView: 3, // Example: show 3 items on medium screens
          },
          // 1024px (lg)
          1024: {
            // slidesPerView: 4, // Example: show 4 items on large screens
          },
        }}
      >
        {carouselProducts.map((product: IProduct, i: number) => (
          <SwiperSlide
            key={product.slug + i} // Use a unique key. Adding 'i' ensures uniqueness for duplicated items in loop mode.
            // Apply your existing Tailwind classes for the slide's dimensions
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
                fill // Use `fill` for Next.js Image component
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
