"use client";

import AccountPageHeader from "app/components/ui/accountPageHeader";
import ProductTable from "./productTable";
import Drawer from "app/components/ui/drawer";
import { useState } from "react";
import AddEditProduct from "./addEditProduct";
import AddEditCategory from "../categories/addEditCategory";
import CategoryTable from "../categories/categoryTable";
import { ICategory, IProduct } from "app/lib/types";

export default function Products() {
  const [isNewProductDrawerOpen, setIsNewProductDrawerOpen] = useState(false);
  const [isNewCategoryDrawerOpen, setIsNewCategoryDrawerOpen] = useState(false);
  const [isViewCategoriesDrawerOpen, setIsViewCategoriesDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct>();

  return (
    <>
      <AccountPageHeader
        title="Products"
        btn={
          <Drawer
            drawerOpenerClass="bg-blue-600 text-white"
            drawerOpenerText={"+ Add Product"}
            title={selectedItem ? "Edit Product" : "New Product"}
            children={
              <AddEditProduct
                item={selectedItem}
                onSuccess={() => setIsNewProductDrawerOpen(false)}
                setSelectedItem={setSelectedItem}
              />
            }
            isOpen={isNewProductDrawerOpen}
            onClose={() => setIsNewProductDrawerOpen(false)}
            onOpen={() => setIsNewProductDrawerOpen(true)}
            size="lg"
          />
        }
      >
        <div className="flex justify-end items-center gap-6">
          <Drawer
            drawerOpenerClass="bg-blue-600 text-white border border-blue-600"
            drawerOpenerText={"+ Add Category"}
            title={"New Category"}
            children={
              <AddEditCategory
                onSuccess={() => setIsNewCategoryDrawerOpen(false)}
              />
            }
            isOpen={isNewCategoryDrawerOpen}
            onClose={() => setIsNewCategoryDrawerOpen(false)}
            onOpen={() => setIsNewCategoryDrawerOpen(true)}
          />
          <Drawer
            drawerOpenerClass="border border-blue-600 bg-white text-blue-600"
            drawerOpenerText={"Categories"}
            title={"View Categories"}
            children={
              <CategoryTable
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
      <div className="dark:bg-black">
        <ProductTable
          setSelectedItem={setSelectedItem}
          setIsNewProductDrawerOpen={setIsNewProductDrawerOpen}
          selectedItem={selectedItem}
        />
      </div>
    </>
  );
}
