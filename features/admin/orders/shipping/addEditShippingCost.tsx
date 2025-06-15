import { yupResolver } from "@hookform/resolvers/yup";
import { useShipping } from "app/api/admin/shipping";
import { ControlledGoogleAddress } from "app/components/form/ControlledGoogleAddress";
import Input from "app/components/form/Input";
import NumberInput from "app/components/form/numberInput";
import SubmitButton from "app/components/form/submitButton";
import { emptyValue } from "app/lib/constants";
import { shippingSchema } from "app/lib/schemas/order";
import { IShipping } from "app/lib/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface addEditShippingCostProps {
  item?: IShipping | undefined;
  onSuccess: () => void;
}
const AddEditShippingCost = ({ item, onSuccess }: addEditShippingCostProps) => {
  const { addShippingCost, updateShippingCost } = useShipping();

  const methods = useForm({
    resolver: yupResolver(shippingSchema),
  });

  const initialValues = {
    name: item?.name ?? emptyValue,
    description: item?.description ?? emptyValue,
    cost: item?.cost ?? 0,
  };

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
      reset(initialValues);
  }, [item]);

  useEffect(() => {
    if (addShippingCost.isSuccess) {
      toast.success(addShippingCost?.data?.message);
      addShippingCost.reset();
      reset();
      onSuccess();
    }
  }, [addShippingCost.isSuccess]);

  useEffect(() => {
    if (updateShippingCost.isSuccess) {
      toast.success(updateShippingCost?.data?.message);
      updateShippingCost.reset();
      reset();
      onSuccess();
    }
  }, [updateShippingCost.isSuccess]);

  const onAddNewShippingCost = (data: any) => {
    if (item) {
      updateShippingCost.mutate({ id: item._id, data: data });
    } else {
      addShippingCost.mutate(data);
    }
  };
  const onSearchLocation = (data: any) => {
    setValue("name", data.lga?.toString());
    setValue("description", data.lga?.toString());
    console.log(data);
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <p className="mb-5 text-xs">
            Start typing an address and select from the suggestions to
            automatically populate the Local Government Area (LGA){" "}
          </p>
          <ControlledGoogleAddress
            name="name"
            methods={methods}
            onSearchLocation={onSearchLocation}
          />
        </div>
        <Input
          name="description"
          placeholder="LGA"
          methods={methods}
          type="text"
          schema={shippingSchema}
          disabled={true}
        />
        <NumberInput
          name="cost"
          placeholder="Cost"
          methods={methods}
          schema={shippingSchema}
        />
        <SubmitButton
          handleSubmit={handleSubmit(onAddNewShippingCost)}
          isLoading={addShippingCost.isPending || updateShippingCost.isPending}
          name={item ? "Save" : "Create"}
        />
      </div>
    </div>
  );
};

export default AddEditShippingCost;
