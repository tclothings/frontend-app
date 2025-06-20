import clsx from "clsx";
import { ButtonHTMLAttributes, useCallback, useEffect } from "react";
import Spinner from "./spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
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
export default function Button({
  text = "",
  icon,
  isLoading,
  className,
  type="button",
  ...props
}: ButtonProps) {
  useEnterKeyListener(() => document.getElementById("submit-button")?.click);
  let btnStyle = clsx(
    "rounded-lg py-2.5 px-[14px] text-white flex font-medium items-center",
    className
  );
const {id} = props
  return (
    <button
      id={type === "submit" ? "submit-button" : id}
      disabled={isLoading}
      {...props}
      className={`${
        icon ? "gap-2 " : ""
      } flex  justify-center text-white disabled:cursor-not-allowed hover:cursor-pointer ${btnStyle}`}
    >
      {isLoading ? <Spinner /> : <>
        {icon && <span>{icon}</span>} {text ? <span>{text}</span> : null} </>}
    </button>
  );
}
