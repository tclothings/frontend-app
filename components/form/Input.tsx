import React, { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { UseFormReturn } from "react-hook-form";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  methods: UseFormReturn<any>;
  placeholder?: string;
  disabled?: boolean;
  type: "text" | "email" | "number" | "tel" | "date" | "datetime-local";
  schema?: any;
}

export default function Input({ methods, name, placeholder, type, schema, ...rest }: IProps) {
  const { errors } = methods.formState;
  const [isFocused, setIsFocused] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  useEffect(() => {
    if (schema?.fields && name) {
      const fieldSchema = schema.fields[name];
      if (fieldSchema) {
        const isRequiredField = fieldSchema.describe().tests.some((test: any) => test.name === "required");
        setIsRequired(isRequiredField);
      }
    }
  }, [schema, name]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isFieldRegistered = methods.watch(name);
  const isClick = isFocused || isFieldRegistered;
  return (
    <>
      <div className={`w-full mb-7 ${"input-container"} ${isClick && "focused"}`}>
        <input
          {...methods.register(name)}
          className={`input ${errors[name] && "error"} ${isClick && "focused"}`}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        <label className={`input-label text-gray-400 ${errors[name] && "error"} ${isClick && "label-up"}`}>
          {placeholder} {isRequired && isClick && <span className="text-red">*</span>}
        </label>

        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p className="error-message mt-[12px]">{message}</p>}
        />
      </div>
    </>
  );
}
