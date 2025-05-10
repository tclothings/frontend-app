"use client"
import Image from "next/image";

export default function EmptyPage({
  imgSrc,
  text,
}: {
  imgSrc: string;
  text: string;
}) {
  return (
    <div className="pt-0 md:pt-6 flex flex-col items-center">
      <div className="mb-6">
        <Image src={imgSrc} alt="No item right now" height={342} width={342} />
      </div>
      <p className="text-grey-900 text-lg font-medium">{text}</p>
    </div>
  );
}
