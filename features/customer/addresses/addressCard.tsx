import Button from "app/components/form/button";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";
import { useAddresses } from "app/api/payment";

const AddressCard = ({
  address,
  setSelectedAddress,
  setShowAddEditAddress,
}: {
  address: any;
  setSelectedAddress: Dispatch<SetStateAction<any>>;
  setShowAddEditAddress: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleEditAddress = () => {
    setSelectedAddress(address);
    setShowAddEditAddress(true);
  };
  const { updateAddress } = useAddresses();

  useEffect(() => {
    if (updateAddress.isSuccess) {
      toast.success(updateAddress?.data?.message);
      updateAddress.reset();
    }
  }, [updateAddress.isSuccess]);

  const handleSetDefaultAddress = () => {
    const data = { isDefault: true };
    updateAddress.mutate({ data, id: address._id });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className={clsx(
          "flex-1 space-y-2 p-4 border rounded-sm",
          {
            "border-blue-600": address?.isDefault,
          },
          {
            "dark:border-white border-gray-300": !address?.isDefault,
          }
        )}
      >
        <p>{address?.address}</p>
        <p>{address?.additionalDetails}</p>

        <p>{address?.phoneNumber?.internationalFormat}</p>
        {/* {address?.isDefault && <p className="mt-2">Default Address </p>} */}
      </div>
      <div
        className={clsx(
          "p-2 flex item-center justify-between border rounded-sm",
          {
            "border-blue-600": address?.isDefault,
          },
          {
            "dark:border-white border-gray-300": !address?.isDefault,
          }
        )}
      >
        <Button
          onClick={handleSetDefaultAddress}
          text={address?.isDefault ? "Default Address" : "Set as default"}
          disabled={address?.isDefault || updateAddress.isPending}
          className={clsx(
            "p-2",
            { "!text-blue-600": !address?.isDefault },
            { "!text-[#313133] !dark:text-white": address?.isDefault }
          )}
        />
        <div className="flex item-center gap-2">
          <Button
            icon={<PencilIcon width="24" color="#2563EB" />}
            className="p-2"
            onClick={handleEditAddress}
          />
          <Button
            icon={<TrashIcon width="24" color="#E04337" />}
            className="p-2"

            // onClick={() => setShowAddEditAddress(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
