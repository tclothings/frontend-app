"use client";
import React from "react";
import Spinner from "./spinner";
import clsx from "clsx";

interface IProps {
  isLoading: boolean;
  handleSubmit: () => void;
  name: string;
  isSmallBtn?: boolean;
  className?: string;
}


export default function DisableButton({
  handleSubmit,
  isLoading,
  name,
  isSmallBtn,
  className,
}: IProps) {
  return (
    <button
      disabled={isLoading}
      onClick={handleSubmit}
      className={clsx(
        "bg-red-600 px-4  text-white py-[10px] font-bold disabled:bg-grey-300 hover:cursor-pointer",
        { "md:px-4 md:py-2 rounded-sm": isSmallBtn },
        {
          "md:px-6 md:py-4 rounded-lg": !isSmallBtn,
        },
        className
      )}
      aria-label={name}
    >
      {!isLoading && name}
      {isLoading && <Spinner />}
    </button>
  );
}
