import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}
export default function Button({ text = "", icon, isLoading, className, ...props }: ButtonProps) {
  let btnStyle;
  if (className?.includes("primary-1")) {
    btnStyle =
      className +
      " rounded-[800px] py-[10px] md:py-4 px-4 md:px-6 bg-primary-600 text-white flex font-medium items-center";
  } else {
    btnStyle = className;
  }

  return (
    <button
      disabled={isLoading}
      {...props}
      className={`${
        icon ? "flex gap-2 justify-center" : ""
      } ${btnStyle} text-white disabled:cursor-not-allowed hover:cursor-pointer`}
    >
      {icon && <span>{icon}</span>} {text ? <span>{text}</span> : null}
    </button>
  );
}
