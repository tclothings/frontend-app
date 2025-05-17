import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useRef, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  name: string;
  label?: string;
  methods: UseFormReturn<any>;
  onSearchLocation: (data: any) => void;
  schema?: any;
}

export const ControlledGoogleAddress = ({
  onSearchLocation,
  name,
  methods,
  label = "Enter location...",
  schema,
}: IProps) => {
  const [searching, setSearching] = useState(false);
  const { errors } = methods.formState;

  const [isFocused, setIsFocused] = useState(false);
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [isRequired, setIsRequired] = useState(false);

  const dropdownRefBtn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRefBtn.current && !dropdownRefBtn.current.contains(event.target as Node)) {
        setSearching(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [searching]);

  // useEffect(() => {
  //   if (schema) {
  //     const fieldSchema = schema.fields[name];
  //     if (fieldSchema) {
  //       const isRequiredField = fieldSchema.describe().tests.some((test: any) => test.name === "required");
  //       setIsRequired(isRequiredField);
  //     }
  //   }
  // }, [schema, name]);

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
    setIsPlaceholder(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isFieldRegistered = methods.watch(name);

  const isClick = isFocused || isFieldRegistered;

  const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY,
    options: {
      componentRestrictions: {
        country: "NG",
      },
      input: "string",
    },
  });

  useEffect(() => {}, [placePredictions]);

  const onSelect = (data: any) => {
    setSearching(false);

    placesService?.getDetails(
      {
        placeId: data.place_id,
      },
      (placeDetails:any) => {
        const geometry = placeDetails?.geometry?.location;
        const long = geometry?.lng();
        const lat = geometry?.lat();
        const address = placeDetails?.formatted_address;
        const addressComponent = placeDetails?.address_components;

        const city = addressComponent?.find((location: any) => location?.types?.[0] === "administrative_area_level_3")
          ?.long_name;
        const area = addressComponent?.find(
          (location: any) => location?.types?.[0] === "neighborhood"
        )?.long_name;
        const state = addressComponent?.find(
          (location: any) =>
            location?.types?.[0] === "administrative_area_level_1"
        )?.long_name;
        const country = addressComponent?.find(
          (location: any) => location?.types?.[0] === "country"
        )?.long_name;
        onSearchLocation({ address, lat, long, city, area, state, country });
        console.log({ city, area, state, country, addressComponent });
        methods.setValue(name, address as string);
      },
    );
  };

  return (
    <section className={`w-full mb-7 ${"input-container"} ${isClick && "focused"}`} ref={dropdownRefBtn}>
      <input
        {...methods.register(name)}
        type="text"
        className={`input ${errors[name] && "error"} ${isClick && "focused"}`}
        onChange={(e) => {
          setSearching(true);
          getPlacePredictions({ input: e.target.value });
        }}
        placeholder={isPlaceholder ? label : ""}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <label className={`input-label text-gray-400 ${errors[name] && "error"} ${isClick && "label-up"}`}>
        {label} {isRequired && isClick && <span className="text-red">*</span>}
      </label>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="error-message mt-[12px]">{message}</p>}
      />

      <div className="relative z-10">
        {placePredictions.length > 0 && searching && (
          <div className="absolute left-0 top-full w-full bg-white shadow-md">
            {placePredictions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-200"
                onClick={() => {
                  onSelect(suggestion);
                }}
              >
                {suggestion.description}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
