import Grid from "app/features/landingPage/components/home/grid";
import { GridTileImage } from "app/components/layout/tile";
import { IProduct } from "app/lib/types";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <>
      {products?.map((product) => (
        <Grid.Item key={product.slug} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.slug}`}
            prefetch={true}
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
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
