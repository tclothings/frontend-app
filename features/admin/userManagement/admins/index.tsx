"use client";

import AccountPageHeader from "app/components/ui/accountPageHeader";
import AdminTable from "./adminTable";
import Drawer from "app/components/ui/drawer";
import AddAdmin from "./addAdmin";
import { useState } from "react";


export default function Admins() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const [activeUserTab, setActiveUserTab] = useState <IUserTable>("customers");
  return (
    <>
      <AccountPageHeader
        title="Admins"
        btn={
          <Drawer
            drawerOpenerClass="bg-blue-600 text-white"
            drawerOpenerText={"+ Add Admin"}
            title={"New Admin"}
            children={<AddAdmin onSuccess={() => setIsDrawerOpen(false)} />}
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onOpen={() => setIsDrawerOpen(true)}
          />
        }
      />
      <div className="dark:bg-black">
        <AdminTable />
      </div>
    </>
  );
}
