"use client";

import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import PaginationCaret from "app/components/icons/paginationCaret";

export default function Pagination({ totalPages }: { totalPages: number }) {
  // NOTE: comment in this code when you get to this point in the course
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="hidden md:flex gap-1">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page.toString())}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <p className="block md:hidden text-sm font-medium">
          Page <span> {currentPage} </span>of
          <span> {totalPages}</span>
        </p>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-[36px] w-[36px] items-center justify-center text-sm border",
    {
      "": position === "first" || position === "single",
      "": position === "last" || position === "single",
      "z-10 border-secondary-500 rounded-md": isActive,
      "text-grey-400": !isActive,
      "": !isActive && position !== "middle",
      "": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
  }) {

  const className = clsx(
    "flex py-[10px] px-4 items-center justify-center rounded-lg border",
    {
      "pointer-events-none border-[var(--grey-50)] opacity-[0.38]":
        isDisabled,
      "border-grey-300": !isDisabled,
      "": direction === "left",
      "": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <button className="flex gap-2 items-center">
        <span className="rotate-180">
          <PaginationCaret
            color={"#D1D5DB"}
          />
        </span>
        <span className="hidden md:flex">Previous</span>
      </button>
    ) : (
      // <ArrowLeftIcon className="w-4" />
      <button className="flex gap-2 items-center">
        <span className="hidden md:flex">Next</span>
        <span className="">
          <PaginationCaret
            color={"#D1D5DB"}
          />
        </span>
      </button>
      // <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
