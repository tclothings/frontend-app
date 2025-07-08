import { formatDate } from "app/lib/utils";

import StatusCard from "app/components/ui/statusCard";
import Spinner from "app/components/form/spinner";
import { useCategories } from "app/api/admin/categories";
import clsx from "clsx";
import Button from "app/components/form/button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ICategory } from "app/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmationModal from "app/components/ui/confirmationModal";
import AddEditCategory from "./addEditCategory";
import Drawer from "app/components/ui/drawer";

interface CategoryTableProps {
  onSuccess: () => void;
}
export default function CategoryTable({ onSuccess }: CategoryTableProps) {
  const [isOpenConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isEditCategoryDrawerOpen, setIsEditCategoryDrawerOpen] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState<ICategory | undefined>();
  const { categories, deleteCategory } = useCategories({
    params: { limitless: true },
    enabled: true,
  });

  useEffect(() => {
    if (deleteCategory.isSuccess) {
      toast.success("Product deleted");
      deleteCategory.reset();
      // onSuccess();
    }
  }, [deleteCategory.isSuccess]);

  const onHandleDeleteProduct = (item: ICategory) => {
    setSelectedItem(item);
    deleteCategory.mutate(item?._id!);
  };
  const onHandleUpdateProduct = (item: ICategory) => {
    setSelectedItem(item);
    setIsEditCategoryDrawerOpen(true);
  };

  if (categories.isPending) return <Spinner />;
  if (categories.isError) return <div>Something went wrong </div>;

  const data = categories?.data?.categories;
  return (
    <>
      <div className="space-y-5 overflow-y-auto h-full">
        {data?.length ? (
          data?.map((category: ICategory, idx: number) => (
            <div
              key={idx}
              className={clsx("pb-5 p-4", {
                "border-b border-b-grey-50": idx !== data.length - 1,
              })}
            >
              <div className="flex justify-end gap-4 mb-3">
                <Button
                  onClick={() => onHandleUpdateProduct(category)}
                  className="p-1"
                  icon={
                    <PencilSquareIcon
                      width={20}
                      className="text-[var(--blue-600)]"
                    />
                  }
                />
                <Button
                  onClick={() => {
                    onHandleDeleteProduct(category);
                    setOpenConfirmationModal(true);
                  }}
                  className="p-1"
                  icon={<TrashIcon width={20} className="text-[var(--red)]" />}
                />
              </div>
              <div className="flex justify-between gap-6 mb-4">
                <p className="text-neutral-500 dark:text-neutral-400">
                  {category?.name}
                </p>
                <StatusCard
                  status={category?.is_active ? "Active" : "Inactive"}
                />
              </div>
              <p className="mb-2">{category?.description}</p>
              <p className="text-xs">{formatDate(category?.createdAt)}</p>
            </div>
          ))
        ) : (
          <p className="mb-4">No category</p>
        )}
      </div>
      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        setIsOpen={setOpenConfirmationModal}
        confirmationMessage="delete category"
        acceptAction={onHandleDeleteProduct}
        title="Delete Category"
      />
      <Drawer
        drawerOpenerClass="bg-blue-600 text-white border border-blue-600"
        title={"Edit Category"}
        children={
          <AddEditCategory
            item={selectedItem}
            onSuccess={() => setIsEditCategoryDrawerOpen(false)}
          />
        }
        isOpen={isEditCategoryDrawerOpen}
        onClose={() => setIsEditCategoryDrawerOpen(false)}
        onOpen={() => setIsEditCategoryDrawerOpen(true)}
      />
    </>
  );
}
