import Input from "app/components/form/Input";
import { CheckoutSchema } from "app/lib/schemas/order";
import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";

const CustomerNote = ({
  methods,
}: {
  methods: UseFormReturn<CheckoutSchema>;
}) => {
  return (
    <div
      className={clsx(
        "w-full border rounded-sm border-b dark:border-white border-gray-300 "
      )}
    >
      <div className="p-2 px-4 border-b dark:border-white border-gray-300">
        <p className="font-bold">CUSTOMER NOTE</p>{" "}
      </div>
      <div className="p-4">
        <Input methods={methods} name="customerNotes" type="text" placeholder="Leave a message" />
      </div>
    </div>
  );
};

export default CustomerNote