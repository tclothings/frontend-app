"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import Select from "app/components/form/select";
import Button from "app/components/form/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderStatuses, paymentStatuses } from "app/lib/constants";
import { orderStatusSchema } from "app/lib/schemas/order";
import Modal from "app/components/ui/modal";
import { useOrders } from "app/api/admin/orders";
import { toast } from "sonner";

interface UpdateStatusProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess: any;
  title?: string;
  item: any
}
const UpdateStatus = ({
  isOpen,
  setIsOpen,
  onSuccess,
  title,
  item
}: UpdateStatusProps) => {

  const { updateOrderStatus } = useOrders({ id: item._id });
  const methods = useForm({
    resolver: yupResolver(orderStatusSchema),
  });

  // const { watch, setValue } = methods;

  // const status = watch("status");
  // const paymentStatus = watch("paymentStatus");

  useEffect(() => {
    if (updateOrderStatus.isSuccess) {
      toast.success(updateOrderStatus?.data?.message);
      updateOrderStatus.reset();
      onSuccess();
 
    }
  }, [updateOrderStatus.isSuccess]);

  const onHandleStatusUpdate = (data: any) => {
    // let data = { status, paymentStatus };

    updateOrderStatus.mutate({ id: item._id, data });
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        className="!bg-[var(--background)]"
      >
        <div className="pt-10 pb-12">
          <div className="space-y-7">
            <Select
              placeholder="Order Status"
              name="status"
              methods={methods}
              options={orderStatuses}
              disabledOptions={["PROCESSING"]}
            />
            <Select
              placeholder="Payment Status"
              name="paymentStatus"
              methods={methods}
              options={paymentStatuses}
              disabledOptions={["PENDING", "PAID", "FAILED"]}
            />
          </div>
          <div className="flex items-center gap-10 justify-between">
            <Button
              isLoading={updateOrderStatus.isPending}
              text="Save"
              onClick={methods.handleSubmit(onHandleStatusUpdate)}
              className="bg-blue-500 text-white rounded py-2 px-4 w-full"
            />
            <Button
              text="Cancel"
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white rounded py-2 px-4 w-full"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateStatus;
