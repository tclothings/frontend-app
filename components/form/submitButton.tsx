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

export default function SubmitButton({ handleSubmit, isLoading, name, isSmallBtn }: IProps) {
  useEnterKeyListener(() => {
    document.getElementById("submit-button")?.click();
  });

  return (
    <button
      disabled={isLoading}
      onClick={handleSubmit}
      id="submit-button"
      className={clsx(
        "bg-blue-600 px-4 py-[10px] font-medium disabled:bg-grey-300 hover:cursor-pointer",
        { "md:px-4 md:py-2 rounded-sm": isSmallBtn },
        {
          "md:px-6 md:py-4 rounded-lg": !isSmallBtn,
        }
      )}
      type="submit"
      aria-label={name}
    >
      {!isLoading && name}
      {isLoading && <Spinner />}
    </button>
  );
}
