import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Button from "app/components/form/button";
import { formatAmount, formatDate, roles } from "app/lib/utils";
import UpdateStatus from "./components/updateStatus";
import { useEffect, useState } from "react";
import { useOrders } from "app/api/admin/orders";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderStatusSchema } from "app/lib/schemas/order";
import { toast } from "sonner";
import SubmitButton from "app/components/form/submitButton";

interface ViewOrderProps {
  onSuccess: () => void;
  item: any;
}
const ViewOrder = ({ onSuccess, item }: ViewOrderProps) => {
  const [isUpdateStatus, setUpdateStatus] = useState(false);

  const { updateOrderStatus, order } = useOrders({ id: item._id });

  const methods = useForm({
    resolver: yupResolver(orderStatusSchema),
  });

  const { watch, setValue } = methods;

  const status = watch("status");
  const paymentStatus = watch("paymentStatus");

  useEffect(() => {
    setValue("status", item.status);
    setValue("paymentStatus", item.paymentStatus);
  }, []);

  useEffect(() => {
    if (updateOrderStatus.isSuccess) {
      toast.success(updateOrderStatus?.data?.message);
      updateOrderStatus.reset();
      setUpdateStatus(false);
      onSuccess();
    }
  }, [updateOrderStatus.isSuccess]);

  const onHandleStatusUpdate = () => {
    let data = { status, paymentStatus };

    updateOrderStatus.mutate({ id: item._id, data });
  };

  // const openUpdateStatusModal = (statusType: string) => {
  //   setUpdateStatus(true)
  // }
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
          {/* <StatusTag status={item?.isActive ? "Active" : "Inactive"} /> */}
        </p>
        <div className="flex flex-col gap-6 border-b border-b-grey-50 mb-10 pb-5">
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Order Number
            </h4>
            <p className="font-medium">{item?.orderNumber}</p>
          </div>

          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Amount Paid
            </h4>
            <p className="font-medium">{formatAmount(item?.totalAmount)}</p>
          </div>

          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Order Status
            </h4>
            <p className="font-medium">{item?.status}</p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Payment Status
            </h4>
            <p className="font-medium">{item?.paymentStatus}</p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="text-neutral-500 dark:text-neutral-400">
              Delivery Note
            </h4>
            <p className="font-medium">{item?.customerNotes}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <SubmitButton
            className="w-full"
            isSmallBtn
            handleSubmit={() => setUpdateStatus(true)}
            isLoading={false}
            name={"Edit"}
          />
        </div>
      </div>
      <UpdateStatus
        methods={methods}
        isOpen={isUpdateStatus}
        setIsOpen={setUpdateStatus}
        acceptAction={onHandleStatusUpdate}
        title="Update Status"
        isLoading={updateOrderStatus.isPending}
      />
    </>
  );
};

export default ViewOrder;
