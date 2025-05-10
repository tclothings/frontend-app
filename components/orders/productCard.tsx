import Image from "next/image";

export default function ProductCard({
  productImg,
  sellerName,
  productName,
}: {
  productImg: string;
  sellerName: string;
  productName: string;
}) {
  return (
    <div className="flex gap-3 w-full">
      <Image
        src={productImg}
        alt={productImg}
        width={48}
        height={48}
        className="rounded"
      />
      <div className="text-sm flex flex-col justify-between text-grey-500 w-full">
        <p className="w-[99%] whitespace-nowrap text-ellipsis overflow-hidden ...">
          {productName}
        </p>
        <p className="underline w-[99%] whitespace-nowrap text-ellipsis overflow-hidden ...">
          {sellerName}
        </p>
      </div>
    </div>
  );
}
