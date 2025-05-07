"use client";
import React, { useEffect } from "react";
import Spinner from "./spinner";

interface IProps {
  isLoading: boolean;
  handleSubmit: () => void;
  name: string;
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

export default function SubmitButton({ handleSubmit, isLoading, name }: IProps) {
  useEnterKeyListener(() => {
    document.getElementById("submit-button")?.click();
  });

  return (
    <button
      disabled={isLoading}
      onClick={handleSubmit}
      id="submit-button"
      className="submit-btn bg-blue-600 px-4 py-[10px] md:px-6 md:py-4 rounded-lg font-medium disabled:bg-grey-300 hover:cursor-pointer"
      type="submit"
      aria-label={name}
    >
      {!isLoading && name}
      {isLoading && <Spinner />}
    </button>
  );
}
