"use client";

import SubmitButton from "app/components/form/submitButton";
import AccountPageHeader from "app/components/ui/accountPageHeader";
import { Suspense, useState } from "react";
import AddEditAddress from "./addEditAddress";
import AddressCard from "./addressCard";
import Spinner from "app/components/form/spinner";
import Pagination from "app/components/ui/pagination";
import { useAddresses } from "app/apis/payment";

export default function Addresses() {
  const [showAddEditAddress, setShowAddEditAddress] = useState(false);
  const { addresses } = useAddresses({ enabled: true });
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const newAdressBtn = (
    <SubmitButton
      isSmallBtn={true}
      name="Add new address"
      isLoading={false}
      handleSubmit={() => setShowAddEditAddress(true)}
    />
  );

  if (addresses.isPending)
    return (
      <div className="mt-20">
        <Spinner />
      </div>
    );
  const data = addresses?.data;
  const addressList = data?.data;
  const totalPages = data?.totalPages;

  return (
    <div className="h-full">
      {showAddEditAddress ? (
        <AddEditAddress
          item={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          setShowAddEditAddress={setShowAddEditAddress}
        />
      ) : (
        <>
          <AccountPageHeader title="Address Book" btn={newAdressBtn} />
          {!addressList?.length ? (
            <p className="text-center">No Address</p>
          ) : null}
          <div className="py-2 grid grid-cols-2 items-stretch gap-4 px-4 overflow-y-auto">
            {addressList?.map((address: any) => (
              <AddressCard
                key={address._id}
                address={address}
                setSelectedAddress={setSelectedAddress}
                setShowAddEditAddress={setShowAddEditAddress}
              />
            ))}
          </div>
          <Suspense>
            <div className="mt-6">
              <Pagination totalPages={totalPages} />
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
}
