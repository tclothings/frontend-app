"use client";

import AddressCard from "./addressCard";
import { useEffect, useState } from "react";
import Drawer from "app/components/ui/drawer";
import Addresses from "./addresses";
import Button from "app/components/form/button";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IAddress } from "app/lib/types";

export default function DeliveryAddress({ defaultAddress }: { defaultAddress: IAddress | null }) {
  const [isAddressDrawerOpen, setAddressDrawerOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<IAddress  | null>(null);

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [defaultAddress]);

  return (
    <>
      <div className="text-sm">
        {/* <AccountPageHeader title="Address Book" /> */}
        {!selectedAddress ? (
          <div
            className={clsx(
              "w-full border rounded-sm border-b dark:border-white border-gray-300 "
            )}
          >
            <div className="flex items-center justify-between p-2 px-4 border-b dark:border-white border-gray-300">
              <p className="font-bold">DELIVERY ADDRESS</p>
              <Button
                onClick={() => setAddressDrawerOpen(true)}
                text="Add Address"
                className="flex-row-reverse !text-blue-600"
                icon={<ChevronRightIcon width={20} className="text-blue-600" />}
              />
            </div>
            <div className="space-y-2 p-4">
              <p className="text-center">No Address</p>
            </div>
          </div>
        ) : (
          <div className="">
            <AddressCard
              address={defaultAddress}
              setAddressDrawerOpen={setAddressDrawerOpen}
            />
          </div>
        )}
      </div>
      <Drawer
        title={"Addresses"}
        children={<Addresses onSuccess={() => setAddressDrawerOpen(false)} />}
        isOpen={isAddressDrawerOpen}
        onClose={() => setAddressDrawerOpen(false)}
        onOpen={() => setAddressDrawerOpen(true)}
        size="xl"
      />
    </>
  );
}
