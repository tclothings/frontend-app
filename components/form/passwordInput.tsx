import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  methods: UseFormReturn<any>;
  placeholder?: string;
  disabled?: boolean;
  schema?: any;
}

export default function PasswordInput({ methods, name, placeholder, schema }: IProps) {
  const { errors } = methods.formState;
  const [inputType, setInputType] = useState("password");
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

  const togglePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const isFieldRegistered = methods.watch(name);

  const isClick = isFocused || isFieldRegistered;

  return (
    <div className={`w-full mb-6 ${"input-container"} ${isClick && "focused"}`}>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          {...methods.register(name)}
          className={`input ${errors[name] && "error"} ${isClick && "focused"}`}
          type={inputType}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <label
          className={`input-label text-gray-400 ${errors[name] && "error"} ${
            isClick && "label-up"
          }`}
        >
          {placeholder}{" "}
          {isRequired && isClick && <span className="text-red">*</span>}
        </label>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            className="btn btn-outline-primary p-3"
            onClick={togglePassword}
          >
            {inputType === "password" ? <EyeSlashIcon/> : <EyeIcon />}
          </button>
        </div>
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="error-message mt-[12px]">{message}</p>
        )}
      />
    </div>
  );
}
