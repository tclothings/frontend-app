"use client";
// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";

export default function ConfirmPayment() {
  // const searchParams = useSearchParams();
  // const reference = searchParams.get("reference");

  // useEffect(() => {
  //   if (reference) {
  //     console.log(reference);
  //   }
  // }, [reference]);

  return (
    <div className="h-screen mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white text-sm">
      <div>Confirming payment</div>
    </div>
  );
}
