"use client";
import React, { useEffect } from "react";
import Spinner from "./spinner";
import clsx from "clsx";

interface IProps {
  isLoading: boolean;
  handleSubmit: () => void;
  name: string;
  isSmallBtn?: boolean;
}


export default function DisableButton({ handleSubmit, isLoading, name, isSmallBtn }: IProps) {


  return (
    <button
      disabled={isLoading}
      onClick={handleSubmit}
      className={clsx(
        "bg-red-600 px-4 py-[10px] font-bold disabled:bg-grey-300 hover:cursor-pointer",
        { "md:px-4 md:py-2 rounded-sm": isSmallBtn },
        {
          "md:px-6 md:py-4 rounded-lg": !isSmallBtn,
        }
      )}
      aria-label={name}
    >
      {!isLoading && name}
      {isLoading && <Spinner />}
    </button>
  );
}
