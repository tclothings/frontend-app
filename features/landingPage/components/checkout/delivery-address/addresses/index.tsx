"use client";

import SubmitButton from "app/components/form/submitButton";
import AccountPageHeader from "app/components/ui/accountPageHeader";
import { useState } from "react";
import AddEditAddress from "./addEditAddress";
import AddressCard from "./addressCard";
import Spinner from "app/components/form/spinner";
import { useAddresses } from "app/api/payment";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Addresses() {
  const [showAddEditAddress, setShowAddEditAddress] = useState(false);
  const { infiniteAddresses } = useAddresses({ enabled: true });
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const newAdressBtn = (
    <SubmitButton
      isSmallBtn={true}
      name="Add new address"
      isLoading={false}
      handleSubmit={() => setShowAddEditAddress(true)}
    />
  );

  const loadMoreAddresses = () => {
    if (infiniteAddresses.hasNextPage) {
      infiniteAddresses.fetchNextPage()
    }
  }
  if (infiniteAddresses.isPending) return <Spinner />;
  const addressList = infiniteAddresses.data?.pages?.flatMap((page)=> page) ?? []
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
            <AccountPageHeader title="" btn={newAdressBtn} />
            {!addressList?.length ? (
              <p className="text-center">No Address</p>
            ) : null}
            <div className="py-2 grid grid-cols-2 items-stretch gap-4 px-4 overflow-y-auto">
              <InfiniteScroll
                dataLength={addressList.length} // Or posts.data.pages.flat().length
                next={loadMoreAddresses}
                hasMore={infiniteAddresses.hasNextPage ?? false}
                loader={<AddressCardSkeleton />}
                scrollThreshold={0.9}
                scrollableTarget="scrollableDiv"
              >
                {addressList?.map((address: any) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    setSelectedAddress={setSelectedAddress}
                    setShowAddEditAddress={setShowAddEditAddress}
                  />
                ))}
              </InfiniteScroll>
              {addressList?.map((address: any) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  setSelectedAddress={setSelectedAddress}
                  setShowAddEditAddress={setShowAddEditAddress}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
}

const AddressCardSkeleton = ()  => {
  return (
    <div className="w-full h-full flex flex-col animate-pulse">
      <div className="flex-1 space-y-2 p-4 border rounded-sm border-gray-300 dark:border-white">
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
        <div className="h-4 bg-gray-300 rounded w-3/5"></div>
        <div className="h-4 bg-gray-300 rounded w-2/5"></div>
      </div>
      <div className="p-2 flex items-center justify-between border rounded-sm border-gray-300 dark:border-white mt-2">
        <div className="h-9 w-28 bg-gray-300 rounded"></div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
          <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
