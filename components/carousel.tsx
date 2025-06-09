"use client"
import { getCollectionProducts } from 'app/lib';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';
import { useProducts } from 'app/api/client/products';
import Spinner from './form/spinner';
import { IProduct } from 'app/lib/types';

export function Carousel() {
  const {products} =  useProducts();

  if (products.isFetching) {
    return <Spinner />
  }

  const data = products?.data?.products
  if (!data?.length) return null;

  console.log(products?.data, "pro");

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
