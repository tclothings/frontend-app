"use client";

import AccountPageHeader from "app/components/ui/accountPageHeader";
import Drawer from "app/components/ui/drawer";
import { useState } from "react";
import AddProduct from "./addOrder";
import OrderTable from "./orderTable";

export default function Orders() {
  const [isNewProductDrawerOpen, setIsNewProductDrawerOpen] = useState(false);
  const [isNewCategoryDrawerOpen, setIsNewCategoryDrawerOpen] = useState(false);
  const [isViewCategoriesDrawerOpen, setIsViewCategoriesDrawerOpen] = useState(false);

  // const [activeUserTab, setActiveUserTab] = useState <IUserTable>("customers");
  return (
    <>
      <AccountPageHeader
        title="Orders"
        btn={
          <Drawer
            drawerOpenerClass="bg-blue-600 text-white"
            drawerOpenerText={"+ Add Order"}
            title={"New Order"}
            children={
              <AddProduct onSuccess={() => setIsNewProductDrawerOpen(false)} />
            }
            isOpen={isNewProductDrawerOpen}
            onClose={() => setIsNewProductDrawerOpen(false)}
            onOpen={() => setIsNewProductDrawerOpen(true)}
          />
        }
      />
      <div className="dark:bg-black">
        <OrderTable />
      </div>
    </>
  );
}
