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
       <CustomerTable /> 
      </div>
    </>
  );
}
