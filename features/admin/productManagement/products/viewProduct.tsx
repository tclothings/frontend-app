import { useProducts } from "app/api/admin/products";
import DisableButton from "app/components/form/disableButton";
import SubmitButton from "app/components/form/submitButton";
import ConfirmationModal from "app/components/ui/confirmationModal";
import StatusTag from "app/components/ui/statusTag";
import { IProduct } from "app/lib/types";
import {
  capitalizeWord,
  formatAmount,
  formatDate,
  formatNumber,
} from "app/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

interface ViewProductProps {
  item: IProduct | undefined;
  setIsNewProductDrawerOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
}
const ViewProduct = ({
  item,
  setIsNewProductDrawerOpen,
  onSuccess,
}: ViewProductProps) => {
  const { deleteProduct } = useProducts();
const [isOpenConfirmationModal, setOpenConfirmationModal] = useState(false)
  useEffect(() => {
    if (deleteProduct.isSuccess) {
      toast.success("Product deleted");
      deleteProduct.reset();
      onSuccess();
    }
  }, [deleteProduct.isSuccess]);

  const onHandleUpdateProduct = () => {
    setIsNewProductDrawerOpen(true);
  };
  const onHandleDeleteProduct = () => {
    deleteProduct.mutate(item?._id!);
  };
  if (!item) {
    return
  }

  return (
    <>
      <div>
        <p className="text-sm mb-6 flex justify-between ">
          <span>
            <span className="text-neutral-500 dark:text-neutral-400">
              Date Created:
            </span>
            <span> {formatDate(item?.createdAt)}</span>
          </span>
          <StatusTag status={item?.isActive ? "Active" : "Inactive"} />
        </p>
        <div className="flex flex-col gap-6 border-b border-b-grey-50 mb-10 pb-5">
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Product Name
            </h4>
            <p className="font-medium">{capitalizeWord(item?.name)}</p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Description
            </h4>
            <p className="font-medium">{capitalizeWord(item?.description)}</p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">Category</h4>
            <p className="font-medium">{capitalizeWord(item?.category)}</p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">Price</h4>
            <p className="font-medium">{formatAmount(item?.price)}</p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">Quantity</h4>
            <p className="font-medium">{formatNumber(item?.quantity)}</p>{" "}
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Materials
            </h4>
            <p className="font-medium">{capitalizeWord(item?.materials)}</p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Image
            </h4>
            <img src={item?.productImage} height={600} width={600}/>
          </div>
        </div>

        <div className="flex justify-center gap-10 items-center">
          <DisableButton
            isSmallBtn
            handleSubmit={() => setOpenConfirmationModal(true)}
            isLoading={deleteProduct.isPending}
            name={"Delete"}
          />
          <SubmitButton
            isSmallBtn
            handleSubmit={onHandleUpdateProduct}
            isLoading={false}
            name={"Edit"}
          />
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        setIsOpen={setOpenConfirmationModal}
        confirmationMessage="delete product"
        acceptAction={onHandleDeleteProduct}
        title="Delete Product"
      />
    </>
  );
};

export default ViewProduct;
