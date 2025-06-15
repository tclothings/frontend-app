import { GridTileImageSkeleton } from "app/components/grid/tile";
import clsx from "clsx";

const ProductsGridSkeleton = () => {
    return (
      <section className="h-full w-full grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 justify-center items-center justify-content-center gap-4">
        <GridTileImageSkeleton />
        <GridTileImageSkeleton /> <GridTileImageSkeleton />{" "}
        <GridTileImageSkeleton /> <GridTileImageSkeleton />{" "}
        <GridTileImageSkeleton /> <GridTileImageSkeleton />{" "}
        <GridTileImageSkeleton /> <GridTileImageSkeleton />
      </section>
    );
}

export default ProductsGridSkeleton;