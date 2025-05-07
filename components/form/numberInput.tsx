import React, { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { UseFormReturn } from "react-hook-form";
import clsx from "clsx";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  methods: UseFormReturn<any>;
  placeholder?: string;
  containerClass?: string;
  schema?: any;
}

export default function NumberInput({ methods, name, placeholder, containerClass, schema, ...rest }: IProps) {
  const { errors } = methods.formState;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isFieldRegistered = methods.watch(name);

  const isClick = isFocused || isFieldRegistered;

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const numericValue = e.currentTarget.value.replace(/[^0-9.]/g, "");
    const validNumericValue = numericValue.split(".").length > 2 ? numericValue.replace(/\.+$/, "") : numericValue;
    methods.setValue(name, validNumericValue);
  };
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
  return (
    <div
      className={clsx(
        "w-full  input-container",
        {
          focused: isClick,
        },
        { "mb-7": !containerClass },
        containerClass,
      )}
    >
      <input
        {...methods.register(name, {
          pattern: {
            message: "Please enter only numbers.",
            value: /^[0-9]*$/,
          },
        })}
        className={`input ${errors[name] && "error"} ${isClick && "focused"}`}
        type="text"
        onInput={handleInput}
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
  );
}
