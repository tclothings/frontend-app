"use client"
import { useProducts } from 'app/api/client/products';
import { GridTileImage } from 'app/components/grid/tile';
import type { IProduct, Product } from 'app/lib/types';
import clsx from 'clsx';
import Link from 'next/link';
import Spinner from '../form/spinner';

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
  const { products } = useProducts({ params: { isFeatured: true } });
  
  console.log(products.data, "products")
  if (products.isFetching) {
  return <Spinner />
}
  const featuredProducts = products?.data?.products
  
  const [firstProduct, secondProduct, thirdProduct] = featuredProducts;


  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      {firstProduct && (
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      )}
      {secondProduct && (
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      )}
      {thirdProduct &&
        <ThreeItemGridItem size="half" item={thirdProduct} />
      }
    </section>
  );
}
