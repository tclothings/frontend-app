import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

type SelectOptions = {
  label: string;
  value: string | number;
};

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: SelectOptions[];
  methods: UseFormReturn<any>;
  placeholder?: string;
  schema?: any;
  disabledOptions?: any[]}

export default function Select({ name, options, methods, placeholder, schema,disabledOptions, ...rest }: IProps) {
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
    <div className={`w-full mb-7 ${"input-container"} ${isClick && "focused"}`}>
      <select
        {...methods.register(name)}
        className={`input ${errors[name] && "error"} ${
          isClick && "focused"
        } bg-transaprent`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
        {/* <option value="" disabled selected>
          <span className="opacity-50 hidden">Select option</span>
        </option> */}
        <option value=""></option>
        {options.map((r) => (
          <option
            key={r.value}
            value={r.value}
            disabled={disabledOptions?.includes(r.value)}
          >
            {r.label}
          </option>
        ))}
      </select>

      <label
        className={`input-label text-gray-400 ${errors[name] && "error"} ${
          isClick && "label-up"
        }`}
      >
        {placeholder}{" "}
        {isRequired && isClick && <span className="text-red">*</span>}
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
