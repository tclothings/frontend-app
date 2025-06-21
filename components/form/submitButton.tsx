"use client";
import React, { useEffect } from "react";
import Spinner from "./spinner";
import clsx from "clsx";

interface IProps {
  isLoading: boolean;
  handleSubmit: () => void;
  name: string;
  isSmallBtn?: boolean;
  className?: string;
  disabled?: boolean;
}
const useEnterKeyListener = (callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
};

export default function SubmitButton({
  handleSubmit,
  isLoading,
  name,
  isSmallBtn,
  className,
  disabled,
}: IProps) {
  useEnterKeyListener(() => {
    document.getElementById("submit-button")?.click();
  });

  return (
    <button
      disabled={disabled || isLoading}
      onClick={handleSubmit}
      id="submit-button"
      className={clsx(
        "bg-blue-600 px-4 py-[10px] font-bold disabled:bg-grey-300 hover:cursor-pointer text-white",
        { "md:px-4 md:py-2 rounded-sm": isSmallBtn },
        {
          "md:px-6 md:py-4 rounded-lg": !isSmallBtn,
        },
        className
      )}
      type="submit"
      aria-label={name}
    >
      {!isLoading && name}
      {isLoading && <Spinner />}
    </button>
  );
}
