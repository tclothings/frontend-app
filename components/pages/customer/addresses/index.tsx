"use client";

import SubmitButton from "app/components/form/submitButton";
import AccountPageHeader from "app/components/ui/accountPageHeader";
import { useState } from "react";
import AddEditAddress from "./addEditAddress";

export default function Addresses() {
  const [showAddEditAddress, setShowAddEditAddress] = useState(false);
  const newAdressBtn = (
    <SubmitButton
      isSmallBtn={true}
      name="Add new address"
      isLoading={false}
      handleSubmit={() => setShowAddEditAddress(true)}
    />
  );
  return (
    <div className="dark:bg-black h-screen px-4">
      {showAddEditAddress ? (
        <AddEditAddress
          item={showAddEditAddress}
          setShowAddEditAddress={setShowAddEditAddress}
        />
      ) : (
        <>
          {" "}
          <AccountPageHeader title="Addresses" btn={newAdressBtn} />
          <div className="py-2 grid grid-cols-2 gap-2">
                  
          </div>{" "}
        </>
      )}
    </div>
  );
}
