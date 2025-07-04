"use client";

import AccountPageHeader from "app/components/ui/accountPageHeader";
import OrderTable from "./orderTable";

export default function Orders() {
  return (
    <>
      <AccountPageHeader
        title="Orders"
      />
      <div className="dark:bg-black">
        <OrderTable />
      </div>
    </>
  );
}
