"use client";

import UserTableTabs from "./userTableTabs";
import AccountPageHeader from "app/components/ui/accountPageHeader";
import { useState } from "react";
import { IUserTable } from "app/lib/types";
import { useAdminUsers, useCustomerUsers } from "app/api/admin/users";
import AdminTable from "./adminTable";
import CustomerTable from "./customerTable";


export default function Customers() {
  // const [activeUserTab, setActiveUserTab] = useState <IUserTable>("customers");
  return (
    <>
      <AccountPageHeader title="Customers" />
      <div className="dark:bg-black">
        <section className="pt-5 pb-[19px] mt-6 md:mt-5 font-medium flex flex-row justify-between items-center">
          {/* <UserTableTabs
            activeUserTab={activeUserTab}
            setActiveUserTab={setActiveUserTab}
          /> */}
        </section>
       <CustomerTable /> 
      </div>
    </>
  );
}
