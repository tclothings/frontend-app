import { ThreeItemGrid } from "app/features/landingPage/components/home/grid/three-items";
import { ProductCarousel } from "../components/home/productCarousel";

export default function Home() {
  return (
    <div className=" w-full mx-auto flex flex-col">
      <ThreeItemGrid />
      <ProductCarousel />
    </div>
  );
}
