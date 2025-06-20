import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "app/components/form/button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const AddressCard = ({
  address,
  setAddressDrawerOpen,
}: {
  address: any;
  setAddressDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div
        className={clsx(
          "w-full border rounded-sm border-b dark:border-white border-gray-300 "
        )}
      >
        <div className="flex items-center justify-between p-2 px-4 border-b dark:border-white border-gray-300">
          <p className="font-bold">DELIVERY ADDRESS</p>{" "}
          <Button
            onClick={() => setAddressDrawerOpen(true)}
            text="Change"
            className="flex-row-reverse !text-blue-600"
            icon={<ChevronRightIcon width={20} className="text-blue-600" />}
          />
        </div>
        <div className="space-y-2 p-4">
          <p>{address?.address}</p>
          <p>{address?.additionalDetails}</p>

          <p>{address?.phoneNumber?.internationalFormat}</p>
          {/* {address?.isDefault && <p className="mt-2">Default Address </p>} */}
        </div>
      </div>
    </>
  );
};

export default AddressCard;
