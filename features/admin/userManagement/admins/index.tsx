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
        <section className="pt-5 pb-[19px] mt-6 md:mt-5 font-medium flex flex-row justify-between items-center">
          {/* <UserTableTabs
            activeUserTab={activeUserTab}
            setActiveUserTab={setActiveUserTab}
          /> */}
        </section>
        <AdminTable />
      </div>
    </>
  );
}
