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
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

interface ViewProductProps {
  item: IProduct | undefined;
  setIsNewProductDrawerOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  setSelectedItem: Dispatch<SetStateAction<any>>;
}
const ViewProduct = ({
  item,
  setIsNewProductDrawerOpen,
  onSuccess,
  setSelectedItem
}: ViewProductProps) => {
  const { deleteProduct } = useProducts();
  const [isOpenConfirmationModal, setOpenConfirmationModal] = useState(false);
  useEffect(() => {
    if (deleteProduct.isSuccess) {
      toast.success("Product deleted");
      deleteProduct.reset();
      onSuccess();
    }
  }, [deleteProduct.isSuccess]);

  const onHandleUpdateProduct = () => {
    setIsNewProductDrawerOpen(true);
    onSuccess();
  };

  const onHandleDeleteProduct = () => {
    deleteProduct.mutate(item?._id!);
  };
  if (!item) {
    return <div>No product found</div>;
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
        <div className="flex flex-col gap-6 mb-10 pb-5">
          <div className="space-y-1  border-b border-b-grey-50 py-2">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Product Name
            </h4>
            <p className="font-medium">{capitalizeWord(item?.name)}</p>
          </div>
          <div className="space-y-1 border-b border-b-grey-50 py-2">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Description
            </h4>
            <p className="font-medium">{capitalizeWord(item?.description)}</p>
          </div>
          <div className="space-y-1 border-b border-b-grey-50 py-2">
            <h4 className="text-neutral-500 dark:text-neutral-400">Category</h4>
            <p className="font-medium">{capitalizeWord(item?.category)}</p>
          </div>
          <div className="space-y-1 border-b border-b-grey-50 py-2">
            <h4 className="text-neutral-500 dark:text-neutral-400">Price</h4>
            <p className="font-medium">{formatAmount(item?.price)}</p>
          </div>
          <div className="space-y-1 border-b border-b-grey-50 py-2">
            <h4 className="text-neutral-500 dark:text-neutral-400">Quantity</h4>
            <p className="font-medium">{formatNumber(item?.quantity)}</p>{" "}
          </div>
          <div className="space-y-1 border-b border-b-grey-50 py-2">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Materials
            </h4>
            <p className="font-medium">{capitalizeWord(item?.materials)}</p>
          </div>
          <div className="space-y-1 border-b border-b-grey-50 py-2">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Product Image
            </h4>
            <Image alt={item.name} src={item?.productImage} height={300} width={300} />
          </div>

          <div className="space-y-1 mt-2">
            <h4 className="dark:text-white text-xl">Media</h4>
            <div className="">
              {item?.media?.length > 0 && (
                <div className="space-y-4">
                  <div className="">
                    <h5 className="text-neutral-500 dark:text-neutral-400">
                      Images
                    </h5>
                    <div className="flex gap-3 flex-wrap">
                      {item?.media
                        ?.filter((item) => item.mediaType == "image")
                        ?.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <Image
                              height={300}
                              width={300}
                              src={img.url}
                              alt={img.altText}
                              className={`object-cover rounded border border-gray-300 cursor-pointer`}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className=" border-b border-b-grey-50 py-2">
                    <h5 className="text-neutral-500 dark:text-neutral-400">
                      Videos
                    </h5>
                    <div className="flex gap-3 flex-wrap">
                      {item?.media
                        ?.filter((item) => item.mediaType == "video")
                        ?.map((img, idx) => (
                          <div key={idx} className="relative group w-[200px]">
                            <video
                              height={200}
                              width={200}
                              src={img.url}
                              controls
                              className="w-full h-auto"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-10 items-center">
          <DisableButton
            isSmallBtn
            handleSubmit={() => setOpenConfirmationModal(true)}
            isLoading={deleteProduct.isPending}
            name={"Delete"}
            className="w-full"
          />
          <SubmitButton
            isSmallBtn
            handleSubmit={onHandleUpdateProduct}
            isLoading={false}
            name={"Edit"}
            className="w-full"
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
