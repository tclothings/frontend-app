import { yupResolver } from "@hookform/resolvers/yup";
import Button from "app/components/form/button";
import { ControlledGoogleAddress } from "app/components/form/ControlledGoogleAddress";
import Input from "app/components/form/Input";
import NumberInput from "app/components/form/numberInput";
import SubmitButton from "app/components/form/submitButton";
import { addressSchema } from "app/lib/schemas/biodata";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const AddEditAddress = ({
  item,
  setShowAddEditAddress,
}: {
  item?: any;
  setShowAddEditAddress: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {}, []);
  const methods = useForm({
    resolver: yupResolver(addressSchema),
  });
  const onSearchLocation = (data: any) => {
    methods.setValue("address", data.address);
    methods.setValue("latitude", data.lat?.toString());
    methods.setValue("longitude", data.long?.toString());
    methods.setValue("area", data.area?.toString());
    methods.setValue("city", data.city?.toString());
    methods.setValue("state", data.state?.toString());
    methods.setValue("country", data.country?.toString());
  };

  return (
    <div className="w-full pb-4">
      <div className="flex items-center gap-4 py-2">
        <Button
          icon={<ArrowLeftIcon width="24" />}
          onClick={() => setShowAddEditAddress(false)}
        />
        <p>{item ? "Edit Address" : "Add a New Address"}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-5 mt-4">
        <NumberInput
          name="postalCode"
          methods={methods}
          placeholder="Postal code"
          schema={addressSchema}
        />
        <ControlledGoogleAddress
          name="address"
          methods={methods}
          onSearchLocation={onSearchLocation}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <NumberInput
          placeholder="Phone Number"
          name="phone"
          methods={methods}
          schema={addressSchema}
        />
        <Input
          placeholder="Additional Details"
          type="text"
          name="additionalDetails"
          methods={methods}
          schema={addressSchema}
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton
          isSmallBtn={true}
          name="Save"
          isLoading={false}
          handleSubmit={() => {}}
        />
      </div>
    </div>
  );
};

export default AddEditAddress;
