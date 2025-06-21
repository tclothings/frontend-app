import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { UseFormReturn } from "react-hook-form";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  methods: UseFormReturn<any>;
  placeholder?: string;
  disabled?: boolean;
}

export default function CustomCheck({ methods, name, placeholder, ...rest }: IProps) {
  const { errors } = methods.formState;

  return (
    <>
      <div className={`inline-flex flex-col justify-end gap-2`}>
        <label htmlFor={name} className={`flex gap-2 items-center ${errors[name] && "error"}`}>
          <input
            {...methods.register(name)}
            id={name}
            className={`${errors[name] && "error"}`}
            type={"checkbox"}
            {...rest}
          />

          <span>{placeholder}</span>
        </label>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <span className="error-message mt-[12px]">{message}</span>}
        />
      </div>
    </>
  );
}
