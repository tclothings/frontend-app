import clsx from "clsx";
import { ButtonHTMLAttributes, useEffect } from "react";
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

const {id, disabled} = props
  return (
    <button
      id={type === "submit" ? "submit-button" : id}
      disabled={isLoading || disabled}
      {...props}
      className={clsx(
        "flex justify-center font-medium rounded-lg py-2.5 px-[14px] items-center text-white disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer",
        icon && "gap-2",
        className
      )}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {icon && <span>{icon}</span>} {text ? <span>{text}</span> : null}{" "}
        </>
      )}
    </button>
  );
}
