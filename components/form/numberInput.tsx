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
  // Add a specific prop to indicate if it's a phone number input
  isPhoneNumber?: boolean;
}

export default function NumberInput({
  methods,
  name,
  placeholder,
  containerClass,
  schema,
  isPhoneNumber = false, // Default to false
  ...rest
}: IProps) {
  const { formState, watch, setValue, register } = methods; // Destructure methods for cleaner access
  const { errors } = formState; // <--- This is the correct way
  const [isRequired, setIsRequired] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Use watch directly instead of creating a new variable
  const fieldValue = watch(name);

  // Check if the field has a value or is focused
  const isClick =
    isFocused ||
    (fieldValue !== undefined && fieldValue !== null && fieldValue !== "");

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const rawValue = e.currentTarget.value;
    let processedValue = "";

    if (isPhoneNumber) {
      // Allow '+' only at the very beginning, then only digits
      if (rawValue.startsWith("+")) {
        processedValue = "+" + rawValue.substring(1).replace(/[^0-9]/g, "");
      } else {
        processedValue = rawValue.replace(/[^0-9]/g, "");
      }
    } else {
      // Original logic for general numbers (allowing a single decimal point)
      const numericValue = rawValue.replace(/[^0-9.]/g, "");
      // Ensure only one decimal point
      processedValue =
        numericValue.split(".").length > 2
          ? numericValue.replace(/\.+$/, "")
          : numericValue;
    }
    setValue(name, processedValue);
  };


  useEffect(() => {
    if (schema?.fields && name) {
      const fieldSchema = schema.fields[name];
      if (fieldSchema) {
        // Check for 'required' test within the Yup schema
        const isRequiredField = fieldSchema
          .describe()
          .tests.some((test: any) => test.name === "required");
        setIsRequired(isRequiredField);
      }
    }
  }, [schema, name]); // Re-run if schema or name changes

  return (
    <div
      className={clsx(
        "w-full input-container",
        {
          focused: isClick,
        },
        { "mb-7": !containerClass },
        containerClass
      )}
    >
      <input
        // Register the field. Removed the local 'pattern' as Yup schema handles it.
        // If you need *basic* browser-level validation, you can add it,
        // but for complex regex, stick to Yup.
        {...register(name)}
        className={`input ${errors[name] && "error"} ${isClick && "focused"}`}
        type={isPhoneNumber ? "tel" : "text"} // Use "tel" for phone numbers, "text" for other numbers
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />

      <label
        className={`input-label text-gray-400 ${errors[name] && "error"} ${
          isClick && "label-up"
        }`}
      >
        {placeholder} {isRequired && <span className="text-red-500">*</span>}
        {/* Show * always if required, not just when focused */}
      </label>

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
