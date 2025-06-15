"use client";

import AccountPageHeader from "app/components/ui/accountPageHeader";
import Drawer from "app/components/ui/drawer";
import { useState } from "react";
import AddProduct from "./addOrder";
import OrderTable from "./orderTable";
import ShippingListTable from "./shipping/shippingListTable";
import AddEditShippingCost from "./shipping/addEditShippingCost";

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
      >
        <div className="flex justify-end items-center gap-6">
          <Drawer
            drawerOpenerClass="bg-blue-600 text-white border border-blue-600"
            drawerOpenerText={"+ Add Shipping Cost"}
            title={"New Shipping Cost"}
            children={
              <AddEditShippingCost
                onSuccess={() => setIsNewCategoryDrawerOpen(false)}
              />
            }
            isOpen={isNewCategoryDrawerOpen}
            onClose={() => setIsNewCategoryDrawerOpen(false)}
            onOpen={() => setIsNewCategoryDrawerOpen(true)}
          />
          <Drawer
            drawerOpenerClass="border border-blue-600 bg-white text-blue-600"
            drawerOpenerText={"Shipping"}
            title={"View Shipping List"}
            children={
              <ShippingListTable
                onSuccess={() => setIsViewCategoriesDrawerOpen(false)}
              />
            }
            isOpen={isViewCategoriesDrawerOpen}
            onClose={() => setIsViewCategoriesDrawerOpen(false)}
            onOpen={() => setIsViewCategoriesDrawerOpen(true)}
            size="lg"
          />
        </div>
      </AccountPageHeader>
      <div className="">
        <OrderTable />
      </div>
    </>
  );
}
