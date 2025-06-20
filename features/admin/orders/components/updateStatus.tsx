"use client";
import { Dispatch, SetStateAction } from "react";
import Select from "app/components/form/select";
import Button from "app/components/form/button";
import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderStatuses, paymentStatuses } from "app/lib/constants";
import { orderStatusSchema } from "app/lib/schemas/order";
import Modal from "app/components/ui/modal";

interface UpdateStatusProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  acceptAction: any;
  title?: string;
  methods: UseFormReturn<any>;
  isLoading: boolean
}
const UpdateStatus = ({
  isOpen,
  setIsOpen,
  acceptAction,
  title,
  methods,
  isLoading,
}: UpdateStatusProps) => {
  const handleAcceptAction = () => {
    acceptAction();
    // setIsOpen(false);
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
            />
            <Select
              placeholder="Payment Status"
              name="paymentStatus"
              methods={methods}
              options={paymentStatuses}
            />
          </div>
          <div className="flex items-center gap-10 justify-between">
            <Button
              isLoading={isLoading}
              text="Save"
              onClick={handleAcceptAction}
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
