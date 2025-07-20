import { yupResolver } from "@hookform/resolvers/yup";
import Button from "app/components/form/button";
import Input from "app/components/form/Input";
import NumberInput from "app/components/form/numberInput";
import SubmitButton from "app/components/form/submitButton";
import { addressSchema } from "app/lib/schemas/biodata";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import CustomCheck from "app/components/form/customCheck";
import { toast } from "sonner";
import { ControlledGoogleAddress } from "app/components/form/controlledGoogleAddress";
import { useAddresses } from "app/api/payment";

const emptyValue = "";
const AddEditAddress = ({
  item,
  setSelectedAddress,
  setShowAddEditAddress,
}: {
  item?: any;
  setSelectedAddress: Dispatch<SetStateAction<any>>;
  setShowAddEditAddress: Dispatch<SetStateAction<boolean>>;
}) => {
  const { addAddress, updateAddress } = useAddresses();

  const initialValues = {
    phoneNumber: item?.phoneNumber?.internationalFormat ?? emptyValue,
    address: item?.address ?? emptyValue,
    additionalDetails: item?.additionalDetails ?? emptyValue,
    isDefault: item?.isDefault ?? false,
  };
  const methods = useForm({
    resolver: yupResolver(addressSchema),
  });
  const { handleSubmit, setValue, reset } = methods;
  const returnToAddressList = () => {
    reset();
    setShowAddEditAddress(false);
    setSelectedAddress(null);
  };
  useEffect(() => {
    if (addAddress.isSuccess) {
      toast.success(addAddress?.data?.message);
      addAddress.reset();
      returnToAddressList();
    }
  }, [addAddress.isSuccess]);

  useEffect(() => {
    if (updateAddress.isSuccess) {
      toast.success(updateAddress?.data?.message);
      updateAddress.reset();
      returnToAddressList();
    }
  }, [updateAddress.isSuccess]);

  useEffect(() => {
    if (item) {
      reset(initialValues);
    }
  }, [item]);

  const onSearchLocation = (data: any) => {
    setValue("address", data.address?.toString());
    setValue("latitude", data.lat?.toString());
    setValue("longitude", data.long?.toString());
    setValue("lga", data.lga?.toString());
    setValue("city", data.city?.toString());
    setValue("state", data.state?.toString());
    setValue("country", data.country?.toString());
    setValue("street", data.street?.toString());
  };

  const onAddEditAddress = (data: any) => {
    // if (!data.lga) {
    //   data.lga = data.city
    // }
    if (item) {
      updateAddress.mutate({ data, id: item._id });
    } else {
      addAddress.mutate(data);
    }
  };

  return (
    <div className="w-full pb-4 px-4">
      <div className="flex items-center gap-4 py-2 mb-10">
        <Button
          icon={<ArrowLeftIcon width="24" className="text-black dark:text-white" />}
          onClick={returnToAddressList}
        />
        <p>{item ? "Edit Address" : "Add a New Address"}</p>
      </div>
      <NumberInput
        disabled={addAddress.isPending}
        placeholder="Phone Number"
        name="phoneNumber"
        methods={methods}
        schema={addressSchema}
        isPhoneNumber={true}
      />
      <ControlledGoogleAddress
        name="address"
        methods={methods}
        onSearchLocation={onSearchLocation}
      />

      <Input
        disabled={addAddress.isPending}
        placeholder="Additional Details"
        type="text"
        name="additionalDetails"
        methods={methods}
        schema={addressSchema}
      />
      <CustomCheck
        name="isDefault"
        methods={methods}
        placeholder="Set as Default Address"
      />
      <div className="flex justify-end">
        <SubmitButton
          isSmallBtn={true}
          name="Save"
          isLoading={addAddress.isPending || updateAddress.isPending}
          handleSubmit={handleSubmit(onAddEditAddress)}
        />
      </div>
    </div>
  );
};

export default AddEditAddress;
