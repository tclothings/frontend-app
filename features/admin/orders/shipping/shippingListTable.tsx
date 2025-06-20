import Spinner from "app/components/form/spinner";
import clsx from "clsx";
import Button from "app/components/form/button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IShipping } from "app/lib/types";
import { useEffect, useState } from "react";
import ConfirmationModal from "app/components/ui/confirmationModal";
import AddEditShippingCost from "./addEditShippingCost";
import Drawer from "app/components/ui/drawer";
import { useShipping } from "app/api/admin/shipping";
import { toast } from "sonner";

// export const metadata = {
//   title: "Categories",
//   description: "View category list",
// };

interface ShippingListTableProps {
  onSuccess: () => void;
}
export default function ShippingListTable({
  onSuccess,
}: ShippingListTableProps) {
  const [isOpenConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isEditShippingCostDrawerOpen, setIsEditShippingCostDrawerOpen] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState<IShipping | undefined>();

  const { shippingCostList, deleteShippingCost } = useShipping({
    enabled: true,
  });

  useEffect(() => {
    if (deleteShippingCost.isSuccess) {
      toast.success("Product deleted");
      deleteShippingCost.reset();
      // onSuccess();
    }
  }, [deleteShippingCost.isSuccess]);

  const onHandleDeleteShippingCost = (item: IShipping ) => {
    setSelectedItem(item);
    deleteShippingCost.mutate(item?._id!);
  };
  const onHandleUpdateProduct = (item: IShipping ) => {
    setSelectedItem(item);
    setIsEditShippingCostDrawerOpen(true);
  };

  if (shippingCostList.isPending) return <Spinner />;
  if (shippingCostList.isError) return <div>Something went wrong </div>;

  const data = shippingCostList?.data?.shippingCosts;

  console.log(shippingCostList?.data, "shippingCostList");

  return (
    <>
      <div className="space-y-5 overflow-y-auto h-full">
        {data?.map((cost: IShipping, idx: number) => (
          <div
            key={idx}
            className={clsx("pb-5 p-4", {
              "border-b border-b-grey-50": idx !== data.length - 1,
            })}
          >
            <div className="flex justify-end gap-4 mb-3">
              <Button
                onClick={() => onHandleUpdateProduct(cost)}
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
                  onHandleDeleteShippingCost(cost);
                  setOpenConfirmationModal(true);
                }}
                className="p-1"
                icon={<TrashIcon width={20} className="text-[var(--red)]" />}
              />
            </div>
            <p className=" mb-4">{cost?.name}</p>
            <p className="text-neutral-500 dark:text-neutral-400 mb-2">
              {cost?.description}
            </p>
            {/* <p className="text-xs">{formatDate(cost?.createdAt)}</p> */}
          </div>
        ))}
      </div>
      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        setIsOpen={setOpenConfirmationModal}
        confirmationMessage="delete shipping cost"
        acceptAction={onHandleDeleteShippingCost}
        title="Delete Shipping Cost"
      />
      <Drawer
        drawerOpenerClass="bg-blue-600 text-white border border-blue-600"
        title={"Edit Shipping Cost"}
        children={
          <AddEditShippingCost
            item={selectedItem}
            onSuccess={() => setIsEditShippingCostDrawerOpen(false)}
          />
        }
        isOpen={isEditShippingCostDrawerOpen}
        onClose={() => setIsEditShippingCostDrawerOpen(false)}
        onOpen={() => setIsEditShippingCostDrawerOpen(true)}
      />
    </>
  );
}
